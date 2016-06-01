/* global angular */
(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('RoomsController', RoomsController);

  RoomsController.$inject = ['$location', '$timeout', 'RoomsService', '$routeParams', 'AdminService', 'CheckLoginService'];

  function RoomsController($location, $timeout, RoomsService, $routeParams, AdminService, CheckLoginService){
    AdminService.checkAdmin();
    CheckLoginService.checkLogin();

    var vm = this;

    vm.submit = submit;

    vm.listRooms =  RoomsService.listRooms();

    vm.action = 'create';

    var key = $routeParams.name;
    if($routeParams.name) {
      loadObject();
      vm.action = 'update';
      vm.readAtr = true; 
    }


    function create() {
      if (vm.room) {
        RoomsService.create(vm.room).then(
          function(data) {
            if(angular.isString(data)) {
              $timeout(function(){vm.message = data;}, 0);
            } else {
              $timeout(function() {
                vm.message = data.roomName + ' created sucessfully!';  
                refresh();
              }, 0);
            }
            console.log(data);
          }, function(error) {
            console.log(error);
          });
      } else {
        vm.message = 'roomName not null';
      }
    }
    
    function refresh() {
      vm.room.roomName = '';
      vm.room.roomDescription = '';
    }
    
    function loadObject() {
      vm.room = RoomsService.findByName($routeParams.name);
    }

    function submit() {
      if(vm.action === 'create') {
        create();
      } else {
        update();
      }
    }

    function update() {
      vm.room.$save().then(function() {
        console.log('Room saved!');
        var url = '/rooms/' + key + '/show';
        $location.url(url);
      });
    }

    vm.redirectRoomEdit = function(){
      var url = '/rooms/' + key + '/edit';
      $location.url(url);
    };
  }
})();
