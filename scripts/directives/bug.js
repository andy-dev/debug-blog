(function() {
  'use strict';

  angular
    .module('debug-blog-app')
    .directive('avBug', avBug);

  function avBug() {
    var directive = {
        restrict: 'E',
        templateUrl: 'views/directives/bug.html',
        scope: {
          bug: '='
        },
        controller: BugFormController,
        controllerAs: 'bugCtrl',
        bindToController: true
    };
    return directive;
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


// function BugFormController($window, $scope, BugService) {

//     $scope.updateBug = function(bug){
//       BugService.updateBug(bug);
//     };

//     $scope.deleteBug = function(bug){
//       if($window.confirm("Delete the Bug?!")){
//         return BugService.deleteBug(bug.id)
//           .then(function(){
//             $scope.$emit('bug.deleted', bug);
//           });
//       }
//     };
//   };