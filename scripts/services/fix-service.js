(function(){
  'use strict';

  angular
    .module('debug-blog-app')
    .factory('FixService', FixService);

    FixService.$inject = ['$http'];

    function FixService ($http){
      var API_URL = 'http://localhost:3000';

      var service = {
        addFixAttempt :  addFixAttempt,
      };

      return service;

      function addFixAttempt(fixAttempt,bugId){
        return $http.post(API_URL.concat('/api/fixattempts'), {
          code: fixAttempt.code,
          notes: fixAttempt.notes,
          source: fixAttempt.sources,
          bugId: bugId
        });
      };
    };
})();