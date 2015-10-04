Meteor.publish('/Projects/get', function (projectsSet) {
  return Projects.find({
    projectsSet: projectsSet
  });
});

Meteor.publish('/Allocations/get', function (projectsSet) {
  return Allocation.find({
    projectsSet: projectsSet
  });
});

Meteor.publish('/Users/get', function () {
  return Meteor.users.find(
    {},
    {
      fields: {
        _id: 1,
        username: 1
      }
    }
  );
});
