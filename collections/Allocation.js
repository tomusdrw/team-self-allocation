this.Allocation = new Mongo.Collection('allocation');
this.Allocation.attachSchema(new SimpleSchema({

  projectsSet: {
    type: String,
    label: 'Projects Set'
  },

  userId: {
    type: String,
    label: 'User Id'
  },
  
  projectPrefs: {
    type: [String],
    label: 'Project Preferences'
  },
   
}));
