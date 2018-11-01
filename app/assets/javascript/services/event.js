angular.module('EventGo').factory('Event', function($resource){
  return $resource('/events/:id/:task', {id: "@id", task: "@task"}, {
    update: {
      method: 'PUT', isArray: false
    },
    going: {
      method: 'POST',
      params: {
        task: 'join'
      }
    },
    notgoing: {
      method: 'POST',
      params: {
        task: 'leave'
      }
    }
  });
});