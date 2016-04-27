(function(){
  'use strict';

  angular
    .module('app.controllers')
    .filter('roomFilter', roomFilter)
    .controller('EventsController', EventsController);

  function roomFilter(){
    return function(input, roomName) {
      if (roomName) {
        return input.filter(function(event) {
          return event.roomName === roomName;
        });
      } else {
        return input;
      }
    };
  }

  EventsController.$inject = ['DataFactory', '$firebaseArray'];
  function EventsController(DataFactory, $firebaseArray){
    var vm = this;
    var eventRef = DataFactory("events");
    var currentDate = new Date();
    var startDate = currentDate.setHours(0,0,0,0);
    var endDate = currentDate.setHours(23,59,59,999);
    vm.timeFrom =  new Date(startDate);
    vm.timeTo =  new Date(endDate);
    reload_data(startDate, endDate);

    vm.change = function(){
      var startDate = Date.parse(new Date(vm.timeFrom));
      var endDate = Date.parse(new Date(vm.timeTo));
      reload_data(startDate, endDate);
    };

    function reload_data(startDate, endDate){
      vm.events = $firebaseArray(eventRef.orderByChild("timeTo").startAt(startDate).endAt(endDate));
      vm.events.$loaded().then(function() {
        vm.rooms = vm.events.map(function(k){return k.roomName;});
      });
    }
  }
})();
