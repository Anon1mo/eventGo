angular.module('EventGo').controller('EventsIndexController', function(Event, $location, Identity, $scope){
  $scope.events = Event.query();
  $scope.search = {};
  $scope.identity = Identity;
  $scope.predicate = 'date';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };

  $scope.changeLoc = function(url) {
    $location.path(url);
  }
});