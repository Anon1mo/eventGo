angular.module('EventGo').factory('Message', function($resource){
  return $resource('/messages/:id/:id2', {id: "@id",id2: "@id2"}, {
    userAll: {
      method: 'GET', isArray: true,
      params: {
        id2: 'user'
      }
    }
  });
});