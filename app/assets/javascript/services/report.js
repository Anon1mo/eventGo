angular.module('EventGo').factory('Report', function($resource) {
  return $resource('/reports/:id', {id: "@id"}, {
    update: {
      method: 'PUT', isArray: false
    }
  });
});