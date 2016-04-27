/* global angular */

(function(){
  'use strict';
  angular
    .module('app.controllers')
    .controller('NavController', NavController);
    
    NavController.$inject = ['$timeout', '$window', 'AccountFactory'];
    
    function NavController($timeout, $window, AccountFactory) {
      var vm = this;
      var current_user;
      
      vm.isLoggedin = AccountFactory.active();
     
      if (vm.isLoggedin) {
        current_user = AccountFactory.current_user();
        vm.fullname = current_user.google.displayName;
        vm.image_url = current_user.google.profileImageURL;
      }
      
      vm.logout = function () {
        if (AccountFactory.logout()) {
          $timeout(function(){
            $window.location.href = '/';
          }, 0);
        }
      };
    }
  }
)();
