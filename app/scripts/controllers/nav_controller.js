/* global angular */

(function(){
  'use strict';
  angular
    .module('app.controllers')
    .controller('NavController', NavController);
    
    NavController.$inject = ['$timeout', '$window', 'AccountFactory'];
    
    function NavController($timeout, $window, AccountFactory) {
      var vm = this;
      var currentUser;
      
      vm.isLoggedin = AccountFactory.active();
     
      if (vm.isLoggedin) {
        currentUser = AccountFactory.currentUser();
        vm.fullname = currentUser.google.displayName;
        vm.imageUrl = currentUser.google.profileImageURL;
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
