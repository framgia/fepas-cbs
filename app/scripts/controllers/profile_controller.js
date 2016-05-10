/* global angular */

(function(){
  'use strict';
  
  angular
    .module('app.controllers')
    .controller('ProfileController', ProfileController);
    
    ProfileController.$inject = ['AccountFactory'];
    
    function ProfileController(AccountFactory) {
      var profile = this;
      var currentUser = AccountFactory.currentUser();
      profile.imageUrl = currentUser.google.profileImageURL;
      profile.fullname = currentUser.google.displayName;
      profile.email = currentUser.google.email;
    }
  }
)();