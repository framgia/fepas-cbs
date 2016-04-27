(function(){
  'use strict';

  angular
    .module('app.controllers')
    .controller('EventPendingController', EventPendingController);


  EventPendingController.$inject = ['DataFactory', '$firebaseArray', 'AdminService'];
  function EventPendingController(DataFactory, $firebaseArray, AdminService){
    AdminService.checkAdmin();

    var vm = this;
    var eventRef = DataFactory("events");
    vm.currentPage = 1;
    vm.eventsPending = $firebaseArray(eventRef.orderByChild("isApproved").equalTo(null));
  }
})();
