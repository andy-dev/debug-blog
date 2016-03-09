(function() {
  'use strict';

  angular
    .module('debug-blog-app')
    .directive('avBug', avBug);

  function avBug() {
    return {
        restrict: 'E',
        templateUrl: 'views/directives/bug.html',
        scope: {
          bug: '='
        },
        controller: BugFormController,
        controllerAs: 'bugCtrl',
        bindToController: true
    };
  };

  BugFormController.$inject = ['$window', '$scope', 'BugService'];

  function BugFormController($window, $scope, BugService) {
    var vm = this;

    vm.updateBug = function(){
      BugService.updateBug(vm.bug);
    };

    vm.deleteBug = function(){
      if($window.confirm("Delete the Bug?!")){
        return BugService.deleteBug(vm.bug.id)
          .then(function(){
            $scope.$emit('bug.deleted', vm.bug);
          });
      }
    };
  };

})();

