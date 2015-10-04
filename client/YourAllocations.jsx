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

  getPreferedProject (index, newState) {
    newState = newState || {};
    let key = 'allocations_' + index;
    if (this.state[key] || newState[key]) {
      return newState[key] || this.state[key];
    }

    if (!this.data.myAllocations) {
      return;
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
          <option disabled>-- select project--</option>
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

    this.setState(newState);

    // Validate if state is currect
    newState.isOk = this.isCurrentStateValid(newState);

  },

  isCurrentStateValid(newState) {
    let prefs = this.getCurrentPrefs(newState);

    // search for duplicates
    var hasDuplicates = prefs.reduce((hasDuplicates, elem, index) => {
      var isDuplicate = prefs.indexOf(elem) !== index;
      return hasDuplicates || isDuplicate;
    }, false);

    var hasUndefined = prefs.filter((x) => x === undefined).length > 0;

    return !hasDuplicates && !hasUndefined;
  },

  getCurrentPrefs (newState) {
    let arr = Array(noOfPrefs).join(',').split(',');
    let prefs = arr.map((v, index) => {
      return this.getPreferedProject(index, newState);
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
          <h1>Your Allocation: {this.data.currentUser.username}</h1>
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
              Update
            </button>
          </form>
        </div>
      </div>
    );
  }
});
