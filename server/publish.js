Meteor.publish('/Projects/get', function (projectsSet) {
  return Projects.find({
    projectsSet: projectsSet
  });
});

Meteor.publish('/Allocations/get', function (projectsSet) {
  return Allocations.find({
    projectsSet: projectsSet
  });
});
