/* global angular */
(function() {
  'use strict';

  angular
    .module('app.services')
    .service('AdminService', AdminService);

  AdminService.$inject = ['$location'];

  function AdminService($location) {
    this.checkAdmin = checkAdmin;
    function checkAdmin() {
      // this is just stubbed data, we'll wirte funfiton checkAdmin() when users login
      var admin = true;
      if(!admin){
        $location.path('/');
        console.log('You don\'t have access here');
      }
    }
  }
})();
