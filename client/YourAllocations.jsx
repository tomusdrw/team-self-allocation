YourAllocations = React.createClass({

  mixins: [ReactMeteorData],

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
    return this.data.myAllocations.projectPrefs[index];
  },

  renderAllocationSelect (name, property) {
    return (
      <div className="form-group">
        <label className="form-label">{name} Preference</label>
        <select 
          ref={`prefs${property}`} 
          className="form-control" 
          value={this.getPreferedProject(property)}
          >
          {this.renderProjectsAsOptions()}
        </select>
      </div>
    );
  },


  onFormSubmit (ev) {
    ev.preventDefault();
    let noOfPrefs = 3;
    let arr = Array(noOfPrefs).join(',').split(',');

    let prefs = arr.map((v, index) => {
      return React.findDOMNode(this.refs[`pref${index}`]).value.trim();
    });
  
    console.log(prefs);
  
    Meteor.call('/Allocations/change', 'all', prefs);
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Your Allocation {this.data.currentUser.name}</h1>
        </header>

        <div className="col-md-5 col-sm-7">
          <form onSubmit={this.onFormSubmit}>
            { this.renderAllocationSelect('First', 0) }
            { this.renderAllocationSelect('Second', 1) }
            { this.renderAllocationSelect('Third', 2) }

            <button className="btn btn-success">
              <span className="glyphicon glyphicon-floppy-disk" />
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
});
