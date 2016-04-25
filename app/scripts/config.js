/* global angular */

(function(){
  'use strict';
  angular.module('app.config')
    .constant('VERSION', '0.0.1')
    .constant('UPSTREAM', 'https://fepas-cbs-dev.firebaseio.com')
    .value('config', {
      appTitle: 'CBS'
    })
    .run(function(){
    });
})();
