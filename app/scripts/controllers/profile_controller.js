/* global angular */

(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['AccountFactory', 'DataFactory', '$firebaseObject'];

    function ProfileController(AccountFactory, DataFactory, $firebaseObject) {
      var profile = this;
      var currentUser = AccountFactory.currentUser();
      var googleId = currentUser.google.id;
      var usersRef = DataFactory('users');
      var userInfo = $firebaseObject(usersRef.child(googleId));

      profile.imageUrl = currentUser.google.profileImageURL;
      profile.fullname = currentUser.google.displayName;
      profile.email = currentUser.google.email;
      profile.user = userInfo;
    }
  }
)();
