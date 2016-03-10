'use strict'

describe('avBug Directive', function () {
    var bugCtrl,
        element,
        BugService,
        $scope,
        $rootScope;

    beforeEach(module('debug-blog-app'));

    beforeEach(inject(function($q, $compile, _$rootScope_, _BugService_) {
        $rootScope = _$rootScope_;

        // $scope = $rootScope.$new();
        var directiveMarkup = angular.element("<av-bug></av-Bug>");
        element = $compile(directiveMarkup)($rootScope);
        $rootScope.$digest();
        bugCtrl = element.controller('BugFormController');


        BugService = _BugService_;


        spyOn(BugService, 'deleteBug').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve('data');
            return deferred.promise;
        });

        spyOn($rootScope,'$emit').and.callThrough();
    }));

    it('should delete a bug', function() {
        bugCtrl.deleteBug(0);
        expect(BugService.deleteBug).toHaveBeenCalledWith(0);
        $rootScope.$digest();
        expect($rootScope.$emit).toHaveBeenCalledWith('bugdeleted');
    });
});

//=====================================Notes=====================================================

// begin by creating a variable bugCtrl that will hold our directive’s scope
// (element) variable that will contain our Angular element

// inject all dependencies. In a beforeEach call
// assign our global $rootScope reference
// create an Angular element out of HTML markup
// compile the element with $rootScope.

// remember how the controller-as syntax works- it creates a toplevel object on scope.
// when a directive is defined using controllerAs, we can get its controller’s methods and properties
// by calling the scope method on our compiled element and then getting the bugCtrl property on that scope
// we defined our directive’s controllerAs property as BugCtrl

// spy on BugService.deleteBug. Since we’re not testing that service, we don’t care what that method actually does,
// so we mock it out by calling .and.callFake and defining a simple function that returns a promise.

// In our directive, when BugService.deleteBug is called successfully, we emit a bugdeleted event
// we spy on the $emit method on $scope:

// We simply call the deleteBug method on the directive’s scope, pass it an
// argument with value 0, and then test to make sure that the method was indeed called with 0.
// We then resolve the promise using $scope.$digest() and then test to make sure the appropriate event was emited:

//=========================================end notes==================================================