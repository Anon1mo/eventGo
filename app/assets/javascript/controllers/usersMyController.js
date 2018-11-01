angular.module('EventGo').controller('UsersMyController', function(User, Offer, $scope, $route, $routeParams, Identity, nwNotifier){
  $scope.identity = Identity;
  $scope.user = User.get({id: $scope.identity.currentUser._id});
  $scope.offers = Offer.user({id: $scope.identity.currentUser._id});

  $scope.deleteUserFromOffer = function(myOffer, user) {
    myOffer.$leave({id: user._id}).then(function() {
      nwNotifier.notify('Use deleted from the offer');
      $route.reload();
    });
  };
  $scope.deleteOffer = function(offer) {
    offer.$delete({id: offer._id}, function() {
      nwNotifier.notify('Offer deleted');
      $route.reload();
    });
  };
});