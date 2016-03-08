(function(){
  'use strict';

  angular
    .module('debug-blog-app', [
      'ui.router'
    ])
    .config(configFunction);

    configFunction.$inject = ['$urlRouterProvider','$stateProvider'];

    function configFunction($urlRouterProvider, $stateProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'homeCtrl',
        resolve: {
          bugs: function(BugService) {
            return BugService.findAllBugs();
          }
        }
      })
      .state('details', {
        url: '/details/:bugId',
        templateUrl: 'views/details.html',
        controller: 'DetailsCtrl',
        controllerAs: 'detailsCtrl',
        resolve: {
          bug: function($stateParams, BugService){
            return BugService.findBug($stateParams.bugId);
          },
          fixAttempts: function($stateParams, FixService){
            return FixService.findAllFixAttempts($stateParams.bugId);
          }
        }
      });
     }
})();
