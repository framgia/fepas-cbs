/* global angular */

(function(){
  'use strict';
  angular
   .module('app.factories')
   .factory('AccountFactory', AccountFactory);
    
    AccountFactory.$inject = ['$firebaseAuth', 'DataFactory'];
    
    function AccountFactory ($firebaseAuth, DataFactory) {
      var auth = $firebaseAuth(DataFactory('users'));
      var account = {};
    
      account.login = function () {
        return auth.$authWithOAuthPopup('google', {scope: 'email'})
          .then(function(authData) {
            console.log(authData.google.email);
          }).catch (function (error) {
            console.error('Authentication failed google:', error); 
          }
        );
      };
     
      account.logout = function () {
        auth.$unauth();
        return true;
      };
      
      account.active = function () {
        var authData = auth.$getAuth();
        return (authData !== null);
      };
       
      account.currentUser = function () {
        var authData = auth.$getAuth();
        return authData;
      };
      
      return account;
    }
  }
());