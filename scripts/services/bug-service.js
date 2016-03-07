(function(){
  'use strict';

  angular
    .module('debug-blog-app')
    .factory('BugService', BugService);

    BugService.$inject = ['$http'];

    function BugService ($http){
      var API_URL = 'http://localhost:3000';

      var service = {
        findAllBugs :  findAllBugs,
        findBug     :  findBug,
        addBug      :  addBug,
        updateBug   :  updateBug,
        deleteBug   :  deleteBug
      };

      return service;

      function findAllBugs() {
        return $http.get(API_URL.concat('/api/Bugs'));
      };

      function findBug(bugId){
        return $http.get(API_URL.concat('/api/Bugs/').concat(bugId));
      };

      function addBug(description){
        return $http.post(API_URL.concat('/api/Bugs'), {
          description: description,
          isResolved: false
        });
      };

      function updateBug(bug){
        return $http.put(API_URL.concat('/api/Bugs/').concat(bug.id), bug);
      };

      function deleteBug(bugId){
        return $http.delete(API_URL.concat('/api/Bugs/').concat(bugId));
      };
    };
})();