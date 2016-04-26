/* global angular */

(function() {
  'use strict';

  angular
    .module('app.services')
    .service('AuthService', AuthService);

  AuthService.$inject = ['AccountFactory', '$location'];

  function AuthService(AccountFactory, $location) {
    this.currentAuth = function () {
      AccountFactory.currentAuth().then(function(authData){
        console.log(authData); 
      }, function (error) {
        if (error === 'AUTH_REQUIRED') {
          $location.path('/login');
        }
      });
    };
  }
})();
