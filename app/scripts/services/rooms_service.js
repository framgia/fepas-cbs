/* global angular */

(function() {
  'use strict';

  angular
    .module('app.services')
    .service('RoomsService', RoomsService);

  RoomsService.$inject = ['$location', 'DataFactory', '$firebaseArray', '$firebaseObject'];

  function RoomsService($location, DataFactory, $firebaseArray, $firebaseObject) {
    this.create = create;
    this.findByName = findByName;
    this.listRooms = index;
    this.update = update;

    var roomsRef = DataFactory('rooms');

    function create(room) {
      return roomsRef.child(room.roomName).once('value').then(
        function(snapshot) {
          if(snapshot.val() !== null) {
            var error = 'Room name: ' + room.roomName + ' existed!';
            return error;
          }
          else {
            return roomsRef.child(room.roomName).set(room).then(function() {
              return room;
            });
          }
        });
    }

    function index() {
      var roomsRef = DataFactory('rooms');
      return $firebaseArray(roomsRef);
    }

    function findByName(name) {
      roomsRef.child(name).once('value').then(function(snapshot){
        if(snapshot.val() === null) {
          var error = 'Room:' + name + ' not existed!';
          $location.url('/');
          throw error;
        }
      });
      return $firebaseObject(roomsRef.child(name));
    }
    
    function update(room) {
      room.$save().then(function() {
        console.log('ok');
      }, function(error) {
        console.log(error);
      });
      return $firebaseObject(roomsRef.child(room.roomName));
    }
  }
})();
