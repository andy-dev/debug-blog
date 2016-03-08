(function(){
  'use strict';

  angular
    .module('debug-blog-app')
    .factory('FixService', FixService);

    FixService.$inject = ['$http'];

    function FixService ($http){
      var API_URL = 'http://localhost:3000';

      var service = {
        addFixAttempt      : addFixAttempt,
        findAllFixAttempts : findAllFixAttempts
      };

      return service;

      function addFixAttempt(fixAttempt,bugId){
        return $http.post(API_URL.concat('/api/Fixattempts'), {
          code    : fixAttempt.code,
          notes   : fixAttempt.notes,
          sources : fixAttempt.sources,
          bugId   : bugId
        });
      };

      function findAllFixAttempts(bugId){
        return $http.get(API_URL.concat('/api/Bugs/').concat(bugId).concat("/FixAttempt"));
      };
    };
})();