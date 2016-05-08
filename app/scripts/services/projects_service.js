(function() {
  'use strict';

  angular
    .module('app.services')
    .service('ProjectsService', ProjectsService);

  ProjectsService.$inject = ['DataFactory', '$q'];

  function ProjectsService(DataFactory, $q) {
    this.create = create;

    function create(project) {
      var projectsRef = DataFactory('projects');
      var newProject = Object.assign({}, project);

      newProject.startDate = new Date(project.startDate).getTime();
      newProject.dueDate = new Date(project.dueDate).getTime();

      if(newProject.startDate > newProject.dueDate) {
        return $q.reject('Start Date must be earlier than Due Date');
      }
      
      return projectsRef.child(newProject.projectName).once('value').then(
        function(snapshot) {
          if(snapshot.val() !== null) {
            var error = 'Project name: ' + newProject.projectName + ' existed!';
            throw error;
          }
          else {
            projectsRef.child(newProject.projectName).set(newProject).then(function() {
              console.log('Created successfully project: ' + newProject.projectName);
              return true;
            });
          }
        });
    }
  }
})();
