angular.module('EventGo').controller('OffersCreateController', function($scope, $location, $routeParams, Offer, Identity, nwNotifier) {

  $scope.edit = $routeParams.offerId;
  if($scope.edit) {
    $scope.offer = Offer.get({id: $scope.edit});
  } else {
    $scope.offer = new Offer();
  }

  $scope.saveOffer = function(){
    $scope.isSubmitting = true;
    $scope.offer.user_id = Identity.currentUser._id;
    $scope.offer.event_id = $routeParams.id;
    $scope.offer.placesAv = $scope.offer.placesMax;
    $scope.offer.$save().then(function(){
      $location.path('/events/' + $routeParams.id);
      nwNotifier.notify('offer created');
    });
  };
  $scope.editOffer = function() {
    $scope.isSubmitting = true;
    $scope.offer.$update().then(function(){
      $location.path("/my");
      nwNotifier.notify('offer modified');
    });
  };



});