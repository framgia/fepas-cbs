(function() {
  'use strict';

  angular
    .module('app.services')
    .service('CheckLoginService', CheckLoginService);

  CheckLoginService.$inject = ['$location', 'DataFactory'];

  function CheckLoginService($location, DataFactory) {
    this.checkLogin = checkLogin;

    function checkLogin() {
      var ref = DataFactory();
      var authData = ref.getAuth();
      if (authData) {
        console.log('User ' + authData.uid + ' is logged in with ' + authData.provider);
      } else {
        console.log('you need to login !');
        $location.url('/');
      }
    }
  }
})();
