this.Projects = new Mongo.Collection('projects');
this.Projects.attachSchema(new SimpleSchema({

  projectsSet: {
    type: String,
    label: 'Projects Set'
  },

  projectName: {
    type: String,
    label: 'Project Name'
  },
  projectDescription: {
    type: String,
    label: 'Project Description'
  }

}));
