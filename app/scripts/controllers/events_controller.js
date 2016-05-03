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

  EventsController.$inject = ['DataFactory', '$firebaseArray', 'EventsService', 'RoomsService', '$location'];
  function EventsController(DataFactory, $firebaseArray, EventsService, RoomsService, $location){
    var vm = this;
    var eventRef = DataFactory("events");
    var currentDate = new Date();
    var startDate = currentDate.setHours(0,0,0,0);
    var endDate = currentDate.setHours(23,59,59,999);

    vm.all_rooms = RoomsService.listRooms();
    vm.booking = {
      roomName: "",
      projectName: "",
      description: "",
      timeFrom: "",
      timeTo: ""
    };

    vm.timeFrom =  new Date(startDate);
    vm.timeTo =  new Date(endDate);
    reload_data(startDate, endDate);

    vm.roomBooking = roomBooking;
    vm.bookingReset = bookingReset;

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

    function roomBooking() {
      var timeFrom = new Date(vm.booking.timeFrom).getTime();
      var timeTo = new Date(vm.booking.timeTo).getTime();

      if(timeFrom < timeTo) {
        var booking = {
          roomName: vm.booking.roomName,
          projectName: vm.booking.projectName,
          description: vm.booking.description,
          timeFrom: timeFrom,
          timeTo: timeTo,
          userName: "abc"
        };

        EventsService.create(booking).then(
        function() {
          $location.path('events');
        },
        function(error) {
          console.log(error);
          $location.path('events/new');
        });
      }
      else {
        console.log('Time from and time to are invalid');
      }
    }

    function bookingReset(form) {
      form.$setPristine();
      form.$setUntouched();
      vm.booking = {
        roomName: "",
        projectName: "",
        description: "",
        timeFrom: "",
        timeTo: ""
      };
    }
  }
})();
