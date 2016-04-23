/* global angular */

(function(){
  'use strict';

  /**
   * @ngdoc function
   * @name app.factories:DataFactory
   * @param {String|Array...} path
   * @return a Firebase instance depends on namespace
   * @description
   * # DataFactory
   * Data ref of the app
   */
  angular.module('app.factories').factory('DataFactory', DataFactory);

  DataFactory.$inject = ['Firebase', 'UPSTREAM'];
  
  function DataFactory(Firebase, UPSTREAM) {
    return function(){
      return new Firebase(_pathRef([UPSTREAM].concat(Array.prototype.slice.call(arguments))));
    };

    /**
     * @ngdoc private function
     * @name _pathRef
     * @param
     * @return
     */
    function _pathRef(args) {
      for(var i=0; i < args.length; i++) {
        if( typeof(args[i]) === 'object' ) {
           args[i] = _pathRef(args[i]);
        }
      }
      return args.join('/');
    }
  }
})();
