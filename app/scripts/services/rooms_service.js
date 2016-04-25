(function() {
  'use strict';

  angular
    .module('app.services')
    .service('RoomsService', RoomsService);

  RoomsService.$inject = ['DataFactory', '$firebaseArray'];

  function RoomsService(DataFactory, $firebaseArray) {
    this.create = create;
    this.listRooms = index;
    function create(room) {
      var roomsRef = DataFactory('rooms');
      $firebaseArray(roomsRef);
      return roomsRef.child(room.roomName).once('value').then(
        function(snapshot) {
          if(snapshot.val() !== null) {
            var error = 'Room name: ' + room.roomName + ' existed!';
            throw error;
          }
          else {
            roomsRef.child(room.roomName).set(room).then(function() {
              console.log('Created successfully room: ' + room.roomName);
              return true;
            });
          }
        });
    }

    function index() {
      var roomsRef = DataFactory('rooms');
      return $firebaseArray(roomsRef);
    }
  }
})();
