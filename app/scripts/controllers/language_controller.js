(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('LanguageController', LanguageController);

  LanguageController.$inject = ['$rootScope', '$translate'];

  function LanguageController($rootScope, $translate){
    var vm = this;

    vm.languageSwitch = $rootScope.lang;

    vm.changeLanguage = function(langKey) {
      $translate.use(langKey);
    };

    $rootScope.$on('$translateChangeSuccess', function(event, data) {
      $rootScope.lang = data;
    });
  }
})();
