const noOfPrefs = 3;

ProjectAllocations = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      projects: Projects.find({}).fetch(),
      allocations: Allocation.find({}).fetch(),
      users: Meteor.users.find({}).fetch()
    }
  },

  findUser (userId) {
    return _.find(this.data.users, (user) => {
      return user._id === userId;
    });
  },

  renderProjectUsers (project, index) {
    let projectId = project._id.toString();

    return this.data.allocations.filter((allocation) => {
      return allocation.projectPrefs[index] === projectId;
    }).map((allocation) => {
      // change to user
      return this.findUser(allocation.userId);
    }).map((user) => {
      return (
        <div className="list-group-item">
          {this.getUserLabel(user)}
        </div>
      );
    });
  },

  getUserLabel(user) {
    return user.username || user.emails[0];
  },

  renderProjectPreferences (project) {
    return _.range(noOfPrefs).map((index) => {
      return (
        <div className="col-sm-4">
          <h5>{index+1}. Preference</h5>
          <div className="list-group">
            { this.renderProjectUsers(project, index) }
          </div>
        </div>
      );
    });
  },

  renderProjects() {
    return this.data.projects.map((project) => {
      return (
        <div>
          <hr />
          <h3>{project.projectName}</h3>
          <p>{project.projectDescription}</p>
          <div className="row">
            { this.renderProjectPreferences(project) }
          </div>
        </div>
      );
    });
  },

  render() {
    return (
      <div>
        {this.renderProjects()}
      </div>
    );
  }
});
