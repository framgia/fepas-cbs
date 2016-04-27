(function() {
  'use strict';

  angular
    .module('app.services')
    .service('EventsService', EventsService);

  EventsService.$inject = ['DataFactory', '$firebaseArray'];

  function EventsService(DataFactory, $firebaseArray) {
    this.create = create;

    function create(create_event) {
      var eventRef = DataFactory('events');
      $firebaseArray(eventRef);
      return eventRef.orderByChild("timeTo").equalTo(create_event.timeTo).once('value').then(function(snapshot) {
        if(snapshot.val() !== null){
          var keys = Object.keys(snapshot.val());
          var data = snapshot.val()[keys[0]];
          if(data.roomName === create_event.roomName && data.timeFrom === create_event.timeFrom) {
            var error = 'event existed!';
              throw error;
          }
        }
        eventRef.push().set(create_event).then(function() {
          console.log("Create successfully event");
          return true;
        });
      });
    }

  }
})();
