/* global angular */

(function(){
  'use strict';
  angular
    .module('app.controllers')
    .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$window', 'AccountFactory'];
    
    function LoginController($window, AccountFactory){
      var vm = this;
      
      vm.inLoggedin = AccountFactory.active();
      
      vm.loginGoogle = function () {
        AccountFactory.login().then(function(){
          $window.location.href = '/';
        });
      };
    }
  }
)();