(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$location', 'DataFactory', '$firebaseObject', 'AdminService', 'CheckLoginService'];

  function UsersController($location, DataFactory, $firebaseObject , AdminService, CheckLoginService){
    AdminService.checkAdmin();
    CheckLoginService.checkLogin();

    var user = this;

    // this is just stubbed data, key will be change when users login
    var key = 'Anh A';
    var usersRef = DataFactory('users');

    user.info = $firebaseObject(usersRef.child(key));

    user.saveProfile = function(){
      user.info.$save().then(function() {
        console.log('Profile saved!');
        $location.url('/');
      });
    };
  }
})();
