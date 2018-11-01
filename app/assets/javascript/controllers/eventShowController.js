angular.module('EventGo').controller('EventsShowController', function(Event, $scope, $route, $http, $routeParams, $location, Identity){

  $scope.event = Event.get({id: $routeParams.id}, function(data) {
    $scope.data = data;
    $scope.going = isGoing($scope.data.users);
    console.log($scope.going);
  });

  $scope.identity = Identity;

  $scope.predicate = 'price';
  $scope.reverse = true;
  $scope.order = function(predicate) {
    $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    $scope.predicate = predicate;
  };


  console.log($scope.event);


  $scope.joinEvent = function() {
    $scope.event.$going({id: $scope.identity.currentUser._id}).then(function() {
      $route.reload();
    });
  };

  $scope.leaveEvent = function() {
    $scope.event.$notgoing({id: $scope.identity.currentUser._id}).then(function() {
      $route.reload();
    });
  };
  $scope.deleteEvent = function(note){
    note.$remove().then(function(){
      $location.path('/events');
    });
  };

  function isGoing(users) {
    var isInArray= users.some(function(user) {
      if(user._id === $scope.identity.currentUser._id) {
        return true;
      }
    });
    return isInArray? true : false;
  }
});