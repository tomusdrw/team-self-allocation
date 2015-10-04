ProjectAllocations = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      projects: Projects.find({}).fetch()
    }
  },

  getProjects() {
    return [{
      name: 'Test1'
    },{
      name: 'Test2'
    }];
  },

  renderProjects() {
    return this.data.projects.map((project) => {
      return (
        <h1>{project.name}</h1>
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
