Projects = new Mongo.Collection('projects');
Projects.attachSchema(new SimpleSchema({

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

if (Meteor.isServer) {
  Houston.add_collection(Projects);
}
