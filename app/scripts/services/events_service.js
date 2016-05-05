/* global angular */
(function() {
  'use strict';

  angular
    .module('app.services')
    .service('EventsService', EventsService);

  EventsService.$inject = ['DataFactory', '$q'];

  function EventsService(DataFactory, $q) {
    this.create = create;

    function create(createEvent) {
      var eventRef = DataFactory('events');
      var eventConflict =[];
      var promises = [];
      promises[1] = eventRef.orderByChild('timeTo').startAt(createEvent.timeFrom+1).endAt(createEvent.timeTo).once('value').then(function(snapshot) {
        snapshot.forEach(function(snap) {
          eventConflict.push(snap.val());
        });
      });

      promises[2] = eventRef.orderByChild('timeFrom').startAt(createEvent.timeFrom).endAt(createEvent.timeTo-1).once('value').then(function(snapshot) {
        snapshot.forEach(function(snap) {
         eventConflict.push(snap.val());
        });
      });

      return $q.all(promises).then( function() {
        return eventRef.orderByChild('timeFrom').endAt(createEvent.timeFrom).once('value').then(function(snapshot) {
          snapshot.forEach(function(snap) {
            if(snap.val().timeTo >= createEvent.timeTo) {
            eventConflict.push(snap.val());
          }
          });
          if(eventConflict.length > 0) {
            eventConflict.forEach(function(conflict) {
              if(conflict.roomName === createEvent.roomName) {
                var error = 'event conflict';
               throw error;
              }
            });
          }
          eventRef.push().set(createEvent).then(function() {
            console.log('Create successfully event');
            return true;
          });
        });
      });
    }

  }
})();
