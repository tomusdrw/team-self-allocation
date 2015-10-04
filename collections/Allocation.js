Allocation = new Mongo.Collection('allocation');
Allocation.attachSchema(new SimpleSchema({

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

Meteor.methods({
  '/Allocations/change': function (projectsSet, prefs) {
    var hasDuplicates = prefs.reduce(function (hasDuplicates, v, index) {
      return hasDuplicates || prefs.indexOf(v) !== index;
    }, false);
  
    if (hasDuplicates) {
      console.warn('Duplicates found!', prefs);
      return;
    }

    Allocation.upsert({
      projectsSet: projectsSet,
      userId: Meteor.userId()
    }, {
      $set: {
        projectsSet: projectsSet,
        userId: Meteor.userId(),
        projectPrefs: prefs
      }
    });
  }
});

if (Meteor.isServer) {
  Houston.add_collection(Allocation);
}
