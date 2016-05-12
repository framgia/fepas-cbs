/* global angular */

(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('ProjectsController', ProjectsController);

  ProjectsController.$inject = ['$location', 'DataFactory', '$firebaseObject', '$routeParams', 'AdminService','CheckLoginService', 'ProjectsService', '$window'];

  function ProjectsController($location, DataFactory, $firebaseObject, $routeParams, AdminService, CheckLoginService, ProjectsService, $window){
    AdminService.checkAdmin();
    CheckLoginService.checkLogin();

    var vm = this;
    
    // Mock owners and members data
    vm.ownerOptions = ['Vu Xuan Dung', 'Nguyen Xuan Son', 'Nguyen Ngoc Tuan'];
    vm.memberOptions = ['Le Trung Kien', 'John Smith', 'Ngoc Trinh'];

    vm.create = create;
    vm.handleEditSubmit = handleEditSubmit;

    var key = $routeParams.name;
    
    if(key) {
      loadObject();
    }
    
    function loadObject() {
      var projectsRef = DataFactory('projects');
      vm.info = $firebaseObject(projectsRef.child(key));
      projectsRef.child(key).once('value').then(function(snapshot){
        if(snapshot.val() === null) {
          var error = 'Project:' + key + ' not existed!';
          $location.url('/');
          throw error;
        }
      });
    }

    vm.redirectEdit = function(){
      var url = '/projects/' + key + '/edit';
      $location.url(url);
    };


    function handleEditSubmit(){
      vm.info.$save().then(function() {
        console.log('Profile saved!');
        var url = '/projects/' + key + '/show';
        $location.url(url);
      });
    }
    
    function create() {
      ProjectsService.create(vm.project).then(
        function() {
          $window.location.href = '#/';
        },
        function(error) {
          console.log(error);
          $window.location.href = '#/projects/new';
        });
    }
  }
})();
