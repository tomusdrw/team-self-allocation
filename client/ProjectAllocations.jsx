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
    let usersInProject = this.data.allocations.filter((allocation) => {
      return allocation.projectPrefs[index] === projectId;
    });

    if (!usersInProject.length) {
      return (
        <p>No one yet.</p>
      );
    }

    return usersInProject.map((allocation) => {
      // change to user
      return this.findUser(allocation.userId);
    }).map((user) => {
      return (
        <li>
          {this.getUserLabel(user)}
        </li>
      );
    });
  },

  getUserLabel(user) {
    if (!user) {
      return 'Anon';
    }
    return user.username || user.emails[0];
  },

  renderProjectPreferences (project) {
    var names = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    return _.range(noOfPrefs).map((index) => {
      return (
        <div className="col-sm-4">
          <h5>{names[index]} Preference</h5>
          <ol>
            { this.renderProjectUsers(project, index) }
          </ol>
        </div>
      );
    });
  },

  renderProjects() {
    return this.data.projects.map((project) => {
      return (
        <div>
          <div className="panel panel-primary">
            <div className="panel-heading"><h3 className="panel-title">{project.projectName}</h3></div>
            <div className="panel-body">
              <p>{project.projectDescription}</p>
              <div className="row">
                { this.renderProjectPreferences(project) }
              </div>
            </div>
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
