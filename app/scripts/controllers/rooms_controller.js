(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('RoomsController', RoomsController);

  RoomsController.$inject = ['$location', '$window', 'RoomsService', '$routeParams', 'AdminService', 'CheckLoginService'];

  function RoomsController($location, $window, RoomsService, $routeParams, AdminService, CheckLoginService){
    AdminService.checkAdmin();
    CheckLoginService.checkLogin();

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
        var url = '/rooms/' + vm.room.roomName + '/show';
        $location.url(url);
      });
    }

    vm.redirectRoomEdit = function(){
      var url = '/rooms/' + vm.room.roomName + '/edit';
      $location.url(url);
    };
  }
})();
