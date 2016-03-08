(function(){
  'use strict';

  angular
    .module('debug-blog-app')
    .controller('DetailsCtrl', DetailsCtrl);

    DetailsCtrl.$inject = ['$scope', 'bug', '$state', '$window', 'FixService'];

    function DetailsCtrl($scope, bug, $state, $window, FixService){
      var vm = this;

      vm.addFixAttempt = addFixAttempt;
      vm.bug = bug.data;

    function addFixAttempt(){
      FixService.addFixAttempt(vm.newFixAttempt, vm.bug.id)
        .then(function(response){
          vm.newFixAttempt.code = null;
          vm.newFixAttempt.notes = null;
          vm.newFixAttempt.sources = null;
        })
      };
    }

})();