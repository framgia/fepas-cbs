/* global angular */
(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$location', 'DataFactory', '$firebaseObject', '$routeParams', 'AdminService','CheckLoginService'];

  function ProjectsController($location, DataFactory, $firebaseObject, $routeParams, AdminService, CheckLoginService){
    AdminService.checkAdmin();
    CheckLoginService.checkLogin();

    var vm = this;
    var key = $routeParams.name;
    var projectsRef = DataFactory('projects');
    vm.info = $firebaseObject(projectsRef.child(key));
    projectsRef.child(key).once('value').then(function(snapshot){
      if(snapshot.val() === null) {
        var error = 'Project:' + key + ' not existed!';
        $location.url('/');
        throw error;
      }
    });

    vm.redirectEdit = function(){
      var url = '/projects/' + key + '/edit';
      $location.url(url);
    };

    vm.handleEditSubmit = function(){
      vm.info.$save().then(function() {
        console.log('Profile saved!');
        var url = '/projects/' + key + '/show';
        $location.url(url);
      });
    };
  }
})();
