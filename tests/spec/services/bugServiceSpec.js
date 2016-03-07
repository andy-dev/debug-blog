'use strict';

  // In the case of writing a spec for a model that makes remote server calls, it’s important to understand that you’re testing the logic in the model and not the results returned from the server or the ability of the $http service to do its job.

  // The only real logic we have to test is whether the URLs are being generated correctly to hit the right resource

  // use $httpBackend to mock out specific server calls and then verify that Service did indeed hit our mock endpoints

describe('BugService service', function () {

    beforeEach(module('debug-blog-app'));

    // This essentially asserts that $httpBackend was able to satisfy the request.
    afterEach(inject(function($httpBackend) {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    }));

    it('Should get all bugs', inject(function(BugService, $httpBackend, $rootScope) {
        var response = [
          {
            "description": "deadly bug in controllers",
            "isResolved": false,
            "id": 1
          },
           {
            "description": "bug in services, service make wrong http",
            "isResolved": false,
            "id": 2
          },
        ];

        $httpBackend.when(
            'GET', 'http://localhost:3000/api/Bugs'
        ).respond(response); // we train our response

        var promise = BugService.findAllBugs(); //call our method we want to test and store result
        $httpBackend.flush(); //trigger the trained response

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });

        $rootScope.$digest(); //to trigger the promise
    }));

    it('Should find a bug given a bugId', inject(function(BugService, $httpBackend, $rootScope) {
      var response = [
        {
          "description": "deadly bug in controllers",
          "isResolved": false,
          "id": 1
        }
      ];

      $httpBackend.when(
          'GET', 'http://localhost:3000/api/Bugs/1'
      ).respond(response);

      var promise = BugService.findBug(1);
      $httpBackend.flush();

      promise.then(function(result) {
          expect(result.data).toEqual(response);
      });

      $rootScope.$digest();
    }));

    it('Should create a new bug', inject(function(BugService, $httpBackend, $rootScope) {
      var response = {};

      $httpBackend.when(
          'POST', 'http://localhost:3000/api/Bugs'
      ).respond(response);

      var promise = BugService.addBug({});
      $httpBackend.flush();

      promise.then(function(result) {
          expect(result.data).toEqual(response);
      });

      $rootScope.$digest();
    }));

   it('Should update', inject(function(BugService, $httpBackend, $rootScope) {
      var response = {};
      $httpBackend.when(
          'PUT', 'http://localhost:3000/api/Bugs/1'
      ).respond(response);

      var bug = {"description": "bug one", "isResolved": false, "id":1};
      var promise = BugService.updateBug(bug);
      $httpBackend.flush();

      promise.then(function(result) {
          expect(result.data).toEqual(response);
      });

      $rootScope.$digest();
    }));

    it('Should delete', inject(function(BugService, $httpBackend, $rootScope) {
        var response = {};
        $httpBackend.when(
            'DELETE', 'http://localhost:3000/api/Bugs/1'
        ).respond(response);

        var bugId = 1;
        var promise = BugService.deleteBug(bugId);
        $httpBackend.flush();

        promise.then(function(result) {
            expect(result.data).toEqual(response);
        });

        $rootScope.$digest();
    }));
});