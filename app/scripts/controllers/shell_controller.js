(function() {
  'use strict';

  angular
    .module('app.controllers')
    .controller('ShellController', ShellController);

  ShellController.$inject = ['config'];

  function ShellController(config) {
    var vm = this;

    vm.title = config.appTitle;
  }
}());
