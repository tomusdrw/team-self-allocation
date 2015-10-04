const noOfPrefs = 3;

YourAllocations = React.createClass({

  mixins: [ReactMeteorData],

  componentWillMount() {
    this.state = {
      dirty: false,
      isOk: true
    };
  },

  getMeteorData() {
    let userId = Meteor.userId();

    return {
      currentUser: Meteor.user(),
      myAllocations: Allocation.findOne({ userId: userId }),
      projects: Projects.find({}).fetch()
    }
  },

  renderProjectsAsOptions () {
    return this.data.projects.map((project) => {
      return (
        <option value={project._id}>{project.projectName}</option>
      );
    });
  },

  getPreferedProject (index) {
    if (!this.data.myAllocations) {
      return;
    }
    if (this.state['allocations_' + index]) {
      return this.state['allocations_' + index];
    }
    return this.data.myAllocations.projectPrefs[index];
  },

  renderAllocationSelect (name, property) {
    let hasError = this.state.isOk ? '' : 'has-error';

    return (
      <div className={"form-group " + hasError}>
        <label className="form-label">{name} Preference</label>
        <select
          onChange={this.handleProjectPreferenceChange.bind(this, property)}
          ref={'prefs' + property} 
          className="form-control" 
          value={this.getPreferedProject(property)}
          >
          {this.renderProjectsAsOptions()}
        </select>
      </div>
    );
  },

  handleProjectPreferenceChange (index, ev) {
    let alloc = 'allocations_' + index;
    let newState = {
      dirty: true
    };
    newState[alloc] = React.findDOMNode(this.refs['prefs' + index]).value.trim();

    // Validate if state is currect
    newState.isOk = this.validateCurrentState();
    this.setState(newState);
  },

  validateCurrentState() {
    let prefs = this.getCurrentPrefs();
    // search for duplicates
    return prefs.reduce((hasDuplicates, elem, index) => {
      return hasDuplicates || prefs.indexOf(elem) !== index;
    }, false);
  },

  getCurrentPrefs () {
    let arr = Array(noOfPrefs).join(',').split(',');
    let prefs = arr.map((v, index) => {
      return this.getPreferedProject(index);
    });

    return prefs;
  },

  onFormSubmit (ev) {
    ev.preventDefault();
    let prefs = this.getCurrentPrefs();
    if (!this.state.isOk) {
      return;
    }

    Meteor.call('/Allocations/change', 'all', prefs);

    this.setState({
      dirty: false
    });
  },

  render() {
    return (
      <div>
        <header>
          <h1>Your Allocation {this.data.currentUser.name}</h1>
        </header>

        <div className="col-md-5 col-sm-7">
          <form onSubmit={this.onFormSubmit}>

            { this.renderAllocationSelect('First', 0) }
            { this.renderAllocationSelect('Second', 1) }
            { this.renderAllocationSelect('Third', 2) }

            <button 
              className="btn btn-success" 
              disabled={!this.state.dirty || !this.state.isOk}
              >
              <span className="glyphicon glyphicon-floppy-disk" />
              Update changes
            </button>
          </form>
        </div>
      </div>
    );
  }
});
