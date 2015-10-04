YourAllocations = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      projects: Projects.find({}).fetch()
    }
  },

  renderProjectsAsOptions () {
    return this.data.projects.map((project) => {
      return (
        <option value={project._id}>{project.name}</option>
      );
    });
  },


  render() {
    return (
      <div className="container">
        <header>
          <h1>Your Allocation {this.data.currentUser.name}</h1>
        </header>

        <div className="col-md-5 col-sm-7">
          <form>
            <div className="form-group">
              <label className="form-label">First Preference</label>
              <select className="form-control">
                {this.renderProjectsAsOptions()}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Second Preference</label>
              <select className="form-control">
                {this.renderProjectsAsOptions()}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Third Preference</label>
              <select className="form-control">
                {this.renderProjectsAsOptions()}
              </select>
            </div>
          </form>
        </div>
      </div>
    );
  }
});
