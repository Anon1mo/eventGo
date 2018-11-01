angular.module('EventGo').controller('OffersShowController', function($scope, $location, $route, $routeParams, Offer, Identity, nwNotifier) {

  $scope.identity = Identity;
  $scope.offer = Offer.get({id: $routeParams.id}, function(data) {
    $scope.data = data;
    $scope.going = isGoing($scope.data.users);
  });

  $scope.joinOffer = function() {
    $scope.offer.$join({id: Identity.currentUser._id}).then(function() {
      $route.reload();
      nwNotifier.notify('Offer joined');
    });
  };

  $scope.leaveOffer = function() {
    $scope.offer.$leave({id: Identity.currentUser._id}).then(function() {
      $route.reload();
      nwNotifier.notify('Offer left');
    });
  };

  function isGoing(users) {
    var isInArray= users.some(function(user) {
      if(user._id === Identity.currentUser._id) {
        return true;
      }
    });
    return isInArray? true : false;
  }
});

