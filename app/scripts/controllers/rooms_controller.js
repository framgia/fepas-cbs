(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('RoomsController', RoomsController);

  RoomsController.$inject = ['$window', 'RoomsService', '$routeParams'];

  function RoomsController($window, RoomsService, $routeParams){
    var vm = this;

    vm.submit = submit;

    vm.listRooms =  RoomsService.listRooms();

    vm.action = 'create';

    if($routeParams.name) {
      loadObject();
      vm.action = 'update';
    }

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

    function loadObject() {
      vm.room = RoomsService.findByName($routeParams.name);
    }

    function submit() {
      if(vm.action === 'create') {
        create();
      }
      else {
        update();
      }
    }

    function update() {
      vm.room.$save().then(function() {
        console.log('Room saved!');
        $window.location.href = '#/rooms/' + vm.room.roomName + '/edit';
      });
    }
  }
})();
