(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$location', 'DataFactory', '$firebaseObject', '$routeParams'];

  function ProjectsController($location, DataFactory, $firebaseObject, $routeParams){
    var vm = this;

    var key = $routeParams.name;
    var projectsRef = DataFactory('projects');
    vm.info = $firebaseObject(projectsRef.child(key));
    projectsRef.child(key).once("value").then(function(snapshot){
      if(snapshot.val() === null) {
        var error = "Project:" + key + " not existed!";
        $location.url('/');
        throw error;
      }
    });

    vm.handleEditSubmit = function(){
      vm.info.$save().then(function() {
        console.log('Profile saved!');
        $location.url('/');
      });
    };
  }
})();
