// Controllers should be lightweight and specific to the view they control.

// Controllers are responsible for receiving data from services and processing it for display in the view, as well as communicating data back to services for logic processing

// Controllers should have no knowledge of the view they control
(function() {
  'use strict';

  angular
    .module('debug-blog-app')
    .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$scope', '$window', 'bugs', 'BugService'];

  function HomeCtrl($scope, $window, bugs, BugService) {
    var vm = this;

    vm.addBug = addBug;
    vm.bugs = bugs.data;
    vm.newBug = {
      description: null
    };

    function addBug(){
      BugService.addBug(vm.newBug.description)
        .then(function(response){
          vm.newBug.description = null;
          vm.bugs.push(response.data);
        })
    };

    $scope.$on('bug.deleted', function(event,bug){
      _.pull(vm.bugs, bug);
    });
  }

})();



