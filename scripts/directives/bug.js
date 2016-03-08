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



  // angular.module('Angello.User')
  //   .directive('userstory',

  //           var controller = function () {
  //               var userStory = this;
  //               userStory.deleteStory = function (id) {
  //                   StoriesModel.destroy(id)
  //                       .then(function (result) {
  //                           $rootScope.$broadcast('storyDeleted');
  //                           $log.debug('RESULT', result);
  //                       }, function (reason) {
  //                           $log.debug('ERROR', reason);
  //                       });
  //               };
  //           };

  //           return {
  //               restrict: 'A',
  //               controller: controller,
  //               controllerAs: 'userStory',
  //               link: linker
  //           };
  //       });


  //       function ($rootScope, StoriesModel, $log) {
  //           var linker = function (scope, element, attrs) {
  //               // element
  //               //     .mouseover(function () {
  //               //         element.css({ 'opacity': 0.9 });
  //               //     })
  //               //     .mouseout(function () {
  //               //         element.css({ 'opacity': 1.0 })
  //               //     });
  //           };



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
