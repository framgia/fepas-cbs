(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('RoomsController', RoomsController);

  RoomsController.$inject = ['$window', 'RoomsService'];

  function RoomsController($window, RoomsService){
    var vm = this;

    vm.create = create;

    function create() {
      RoomsService.create(vm.room).then(
        function() {
          $window.location.href = '#/';
        },
        function(error) {
          console.log(error);
          $window.location.href = '#/rooms/new';
        });
    }
  }
})();
