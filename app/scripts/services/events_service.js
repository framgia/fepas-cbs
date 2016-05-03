(function() {
  'use strict';

  angular
    .module('app.services')
    .service('EventsService', EventsService);

  EventsService.$inject = ['DataFactory', '$q'];

  function EventsService(DataFactory, $q) {
    this.create = create;

    function create(create_event) {
      var eventRef = DataFactory('events');
      var event_conflict =[];
      var promises = [];
      promises[1] = eventRef.orderByChild("timeTo").startAt(create_event.timeFrom+1).endAt(create_event.timeTo).once('value').then(function(snapshot) {
        snapshot.forEach(function(snap) {
          event_conflict.push(snap.val());
        });
      });

      promises[2] = eventRef.orderByChild("timeFrom").startAt(create_event.timeFrom).endAt(create_event.timeTo-1).once('value').then(function(snapshot) {
        snapshot.forEach(function(snap) {
         event_conflict.push(snap.val());
        });
      });

      return $q.all(promises).then( function() {
        return eventRef.orderByChild("timeFrom").endAt(create_event.timeFrom).once('value').then(function(snapshot) {
          snapshot.forEach(function(snap) {
            if(snap.val().timeTo >= create_event.timeTo) {
            event_conflict.push(snap.val());
          }
          });
          if(event_conflict.length > 0) {
            event_conflict.forEach(function(conflict) {
              if(conflict.roomName === create_event.roomName) {
                var error = 'event conflict';
               throw error;
              }
            });
          }
          eventRef.push().set(create_event).then(function() {
            console.log("Create successfully event");
            return true;
          });
        });
      });
    }

  }
})();
