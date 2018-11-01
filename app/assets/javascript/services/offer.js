angular.module('EventGo').factory('Offer', function($resource){
  return $resource('/offers/:id/:task', {id: "@id", task: "@task"}, {
    update: {
      method: 'PUT', isArray: false
    },
    join: {
      method: 'POST',
      params: {
        task: 'join'
      }
    },
    leave: {
      method: 'POST',
      params: {
        task: 'leave'
      }
    },
    user: {
      method: 'GET',
      isArray: true,
      params: {
        task: 'user'
      }
    }
  });
});