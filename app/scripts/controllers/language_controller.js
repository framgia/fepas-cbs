(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('LanguageController', LanguageController);

  LanguageController.$inject = ['$translate'];

  function LanguageController($translate){
    var vm = this;

    vm.changeLanguage = function(langKey) {
      $translate.use(langKey);
    };
  }
})();
