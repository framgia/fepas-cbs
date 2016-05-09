(function() {
  'use strict';

  angular
    .module('app.services')
    .service('RoomsService', RoomsService);

  RoomsService.$inject = ['DataFactory', '$firebaseArray', '$firebaseObject'];

  function RoomsService(DataFactory, $firebaseArray, $firebaseObject) {
    this.create = create;
    this.findByName = findByName;
    this.listRooms = index;

    var roomsRef = DataFactory('rooms');

    function create(room) {
      
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
    
    function findByName(name) {
      return $firebaseObject(roomsRef.child(name));
    }
  }
})();
