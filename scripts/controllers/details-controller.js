(function(){
  'use strict';

  angular
    .module('debug-blog-app')
    .controller('DetailsCtrl', DetailsCtrl);

    DetailsCtrl.$inject = ['$scope', 'bug', 'fixAttempts','$state', '$window', 'FixService'];

    function DetailsCtrl($scope, bug, fixAttempts, $state, $window, FixService){
      var vm = this;

      vm.fixAttempts = fixAttempts.data;
      vm.addFixAttempt = addFixAttempt;
      vm.bug = bug.data;
      vm.newFixAttempt = {
        code: null,
        notes: null,
        sources: null,
        bugId: null
      };

    function addFixAttempt(){
      FixService.addFixAttempt(vm.newFixAttempt, vm.bug.id)
        .then(function(response){
          vm.newFixAttempt.code = null;
          vm.newFixAttempt.notes = null;
          vm.newFixAttempt.sources = null;
          vm.fixAttempts.push(response.data);
        })
      };
    }

})();