
'use strict'


describe('avBug Directive', function () {
    var bugCtrl,
        element,
        BugService,
        template,
        $scope,
        $rootScope;

    beforeEach(module('debug-blog-app'));

    beforeEach(inject(function($q, $compile, _$rootScope_, _BugService_) {
        $rootScope = _$rootScope_;

        var directiveMarkup = angular.element("<av-bug></av-bug>");
        element = $compile(directiveMarkup)($rootScope);
        bugCtrl = element.scope().bugCtrl;

        BugService = _BugService_;


        spyOn(BugService, 'deleteBug').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve('data');
            return deferred.promise;
        });

        spyOn($rootScope,'$emit').and.callThrough();
    }));

    it('should delete a bug', function() {

        bugCtrl.deleteBug('0');
        debugger
        expect(BugService.deleteBug).toHaveBeenCalledWith('0');
        $rootScope.$digest();
        expect($rootScope.$emit).toHaveBeenCalledWith('bugdeleted');
    });
});

