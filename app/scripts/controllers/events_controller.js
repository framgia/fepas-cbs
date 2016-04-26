/* global angular */
(function(){
  'use strict';

  angular
    .module('app.controllers')
    .filter('roomFilter', roomFilter)
    .controller('EventsController', EventsController);

  function roomFilter(){
    return function(input, value) {
      if (value) {
        return input.filter(function(object) {
          if (angular.isNumber(value)) {
            return object.roomCapacity === value;
          } else {
            return object.roomName === value;
          }
        });
      } else {
        return input;
      }
    };
  }

  EventsController.$inject = [ '$location', '$scope', '$compile', '$timeout', 'DataFactory', '$firebaseArray', 'uiCalendarConfig', 'EventsService', 'RoomsService'];
  function EventsController($location, $scope, $compile, $timeout, DataFactory, $firebaseArray, uiCalendarConfig, EventsService, RoomsService){
    var vm = this;
    var eventRef = DataFactory('events');
    var currentDate = new Date();
    var startDate = currentDate.setHours(0,0,0,0);
    var endDate = currentDate.setHours(23,59,59,999);
    vm.seats = [];
    vm.rooms = [];
    vm.allRooms = RoomsService.listRooms();
    vm.allRooms.$loaded().then(function(rooms) {
      angular.forEach(rooms, function(room){
        if (vm.seats.indexOf(room.roomCapacity) === -1) {
          vm.seats.push(room.roomCapacity); 
        }
        if(vm.rooms.indexOf(room.roomName) === -1) {
          vm.rooms.push(room.roomName);
        }
      });
    });

    vm.booking = {
      roomName: '',
      projectName: '',
      description: '',
      timeFrom: '',
      timeTo: ''
    };

    vm.timeFrom =  new Date(startDate);
    vm.timeTo =  new Date(endDate);
    reloadData(startDate, endDate);
    $scope.events = [];
    initCalendar();

    vm.roomBooking = roomBooking;
    vm.bookingReset = bookingReset;

    vm.changeRoom = function(){
      var startDate = Date.parse(new Date(vm.timeFrom));
      var endDate = Date.parse(new Date(vm.timeTo));
      reloadData(startDate, endDate);
    };

    function reloadData(startDate, endDate){
      vm.eventList = $firebaseArray(eventRef.orderByChild('timeTo').startAt(startDate).endAt(endDate));
      vm.eventList.$loaded().then(function() {
        //get all rooms when roomName is null or undefined
        if (vm.selectedRoomName !== undefined && vm.selectedRoomName !== null){
          vm.eventList = vm.eventList.filter(function(event){return event.roomName === vm.selectedRoomName;});
        }
        var events = vm.eventList.map(function(k){return {
          title: k.description,
          start: new Date(k.timeFrom),
          end: new Date(k.timeTo)
          };
        });
        $scope.events = events;

        uiCalendarConfig.calendars.eventCalendar.fullCalendar('removeEvents');
        uiCalendarConfig.calendars.eventCalendar.fullCalendar('addEventSource', $scope.events);
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
          userName: 'abc'
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
        roomName: '',
        projectName: '',
        description: '',
        timeFrom: '',
        timeTo: ''
      };
    }


    function initCalendar(){

      $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
      };

      /* Change View */
      $scope.renderCalender = function(calendar) {
        $timeout(function() {
          if(uiCalendarConfig.calendars[calendar]){
            uiCalendarConfig.calendars[calendar].fullCalendar('render');
          }
        });
      };

       /* Render Tooltip */
      $scope.eventRender = function( event, element ) {
        element.attr({'tooltip': event.title,
                      'tooltip-append-to-body': true});
        $compile(element)($scope);
      };

      $scope.bookRoom = function(start, end){
        var timeFrom = Date.parse(start._d);
        var timeTo = Date.parse(end._d);
        if(vm.selectedRoomName === undefined){
          window.alert('Please choose a room');
        }else{
          $location.url('/events/new?room_name=' + vm.selectedRoomName + '&start=' + timeFrom + '&end=' + timeTo);
        }
      };

      /* config object */
      $scope.uiConfig = {
        calendar:{
          height: 450,
          forceEventDuration: true,
          allDayText: 'vkl',
          minTime: '08:00:00',
          maxTime: '20:00:00',
          editable: false,
          selectable: true,
          select: $scope.bookRoom,
          disableResizing: true,
          selectHelper: true,
          header:{
            left: 'title',
            center: '',
            right: 'today prev,next'
          },
          eventClick: $scope.alertOnEventClick,
          eventDrop: $scope.alertOnDrop,
          eventResize: $scope.alertOnResize,
          eventRender: $scope.eventRender
        }
      };

      $scope.eventSources = [$scope.events];
    }
  }
})();