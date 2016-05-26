(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$location', 'DataFactory', '$firebaseObject', 'AdminService', 'CheckLoginService', 'AccountFactory'];

  function UsersController($location, DataFactory, $firebaseObject , AdminService, CheckLoginService, AccountFactory){
    AdminService.checkAdmin();
    CheckLoginService.checkLogin();

    var user = this;

    var currentUser = AccountFactory.currentUser();
    var key = currentUser.google.id;
    var usersRef = DataFactory('users');

    user.info = $firebaseObject(usersRef.child(key));

    user.saveProfile = function(){
      user.info.$save().then(function() {
        console.log('Profile saved!');
        $location.url('/profile');
      });
    };
  }
})();
