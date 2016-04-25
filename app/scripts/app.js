/* global angular */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name app
   * @description
   * # App
   *
   * Main module of the application.
   */

  angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'app.config',
    'app.controllers',
    'app.directives',
    'app.factories',
    'app.services'
  ])
  .config(routeFunction)
  .run(runFunction);

  // Pre-init modules
  angular.module('app.config', []);
  angular.module('app.controllers', []);
  angular.module('app.directives', []);
  angular.module('app.factories', []);
  angular.module('app.services', []);

  // angularRoute
  routeFunction.$inject = ['$routeProvider'];
  function routeFunction($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        title: 'Main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController',
        controllerAs: 'about',
        title: 'About'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact',
        title: 'Contact'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  // Function that run right after app is initialized

  // $route is needed to work arround https://github.com/angular/angular.js/issues/1213
  runFunction.$inject = ['DataFactory', 'Firebase', '$rootScope', '$route'];
  function runFunction(DataFactory, Firebase, $rootScope, $route){ // jshint ignore:line
    // https://www.firebase.com/docs/web/guide/offline-capabilities.html
    // since I can connect from multiple devices or browser tabs, we store each connection instance separately
    // any time that connectionsRef's value is null (i.e. has no children) I am offline
    var connectionsRef = DataFactory('connections');

    DataFactory('.info/connected').on('value', function(snap) {
      if (snap.val() === true) {
        // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)

        // add this device to my connections list
        // this value could contain info about the device or a timestamp too
        var con = connectionsRef.push(Firebase.ServerValue.TIMESTAMP);

        // when I disconnect, remove this device
        con.onDisconnect().remove();

        // Report number of connected connection
        connectionsRef.on('value', function(snap){
          console.info('Connected user: ' + snap.numChildren());
        });
      }

      $rootScope.$on('$routeChangeSuccess',
        function(event, current) {
          $rootScope.title = current.title;
        }
      );
    });
  }
})();
