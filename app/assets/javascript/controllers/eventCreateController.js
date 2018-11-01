angular.module('EventGo').controller('EventsCreateController', function($scope, Event, $location, $routeParams, nwNotifier){

  $scope.edit = $routeParams.id;
  if($scope.edit) {
    $scope.event = Event.get({id: $routeParams.id});
  } else {
    $scope.event = new Event();
  }
  $scope.isSubmitting = false;

  $scope.saveEvent = function(){
    $scope.isSubmitting = true;
    $scope.event.$save().then(function(){
      $location.path("/events");
      nwNotifier.notify('Event created');
    }).finally(function(){
      $scope.isSubmitting = false;
    });
  };
  $scope.editEvent = function() {
    $scope.isSubmitting = true;
    $scope.event.$update().then(function(){
      $location.path("/events");
      nwNotifier.notify('Event modified');
    }).finally(function(){
      $scope.isSubmitting = false;
    });
  };

});