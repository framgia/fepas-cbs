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
    'app.services',
    'ui.calendar'
  ])
  .config(routeFunction)
  .run(runFunction);

  // Pre-init modules
  angular.module('app.config', ['pascalprecht.translate'])
    .config(languageFunction);
  angular.module('app.controllers', []);
  angular.module('app.directives', ['angularUtils.directives.dirPagination']);
  angular.module('app.factories', []);
  angular.module('app.services', []);

  languageFunction.$inject = ['$translateProvider'];
  function languageFunction($translateProvider){
    $translateProvider
      .useStaticFilesLoader({
        prefix: '/translations/locale-',
        suffix: '.json'
      })
      .preferredLanguage('vn')
      .useMissingTranslationHandlerLog()
      .useSanitizeValueStrategy('escape');
  }

  // angularRoute
  routeFunction.$inject = ['$routeProvider'];
  function routeFunction($routeProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutController',
        controllerAs: 'about'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController',
        controllerAs: 'contact'
      })
      .when('/users/edit', {
        templateUrl: 'views/users/edit.html',
        controller: 'UsersController',
        controllerAs: 'user'
      })
      .when('/rooms/new', {
        templateUrl: 'views/rooms/new.html',
        controller: 'RoomsController',
        controllerAs: 'room'
      })
      .when('/rooms/pending', {
        templateUrl: 'views/event_pending/pending.html',
        controller: 'EventPendingController',
        controllerAs: 'event'
      })
      .when('/events', {
        templateUrl: 'views/events/index.html',
        controller: 'EventsController',
        controllerAs: 'eventList'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .when('/rooms', {
        templateUrl: 'views/rooms/index.html',
        controller: 'RoomsController',
        controllerAs: 'room'
      })
      .when('/rooms/:name/edit', {
        templateUrl: 'views/rooms/edit.html',
        controller: 'RoomsController',
        controllerAs: 'room'
      })
      .when('/projects/:name/edit', {
        templateUrl: 'views/projects/edit.html',
        controller: 'ProjectsController',
        controllerAs: 'project'
      })
      .when('/events/new', {
        templateUrl: 'views/events/new.html',
        controller: 'EventsController',
        controllerAs: 'newEvent'
      })
      .when('/projects/:name/show', {
        templateUrl: 'views/projects/show.html',
        controller: 'ProjectsController',
        controllerAs: 'project'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile', 
        resolve: {
          currentAuth: function (AuthService) {
            return AuthService.currentAuth();
          }
        }
      })
      .when('/projects/new', {
        templateUrl: 'views/projects/new.html',
        controller: 'ProjectsController',
        controllerAs: 'newProject'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
  
  // Function that run right after app is initialized

  runFunction.$inject = ['DataFactory', 'Firebase', '$rootScope'];
  function runFunction(DataFactory, Firebase, $rootScope){
    $rootScope.language = 'vn';
    $rootScope.$on('$translateChangeSuccess', function(event, data) {
      $rootScope.language = data.language;
    });
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
    });
  }
})();
