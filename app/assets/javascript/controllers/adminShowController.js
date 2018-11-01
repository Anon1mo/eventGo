angular.module('EventGo').controller('AdminShowController', function($route, User, Event, Offer, Report, $scope, nwNotifier){
  $scope.users = User.query();
  $scope.events = Event.query();
  $scope.offers = Offer.query();
  $scope.reports = Report.query();

  $scope.deleteEvent = function(event) {
    console.log(event._id);
    event.$delete({id: event._id}, function() {
      nwNotifier.notify('Event deleted');
      $route.reload();
    });
  };
  $scope.deleteOffer = function(offer) {
    console.log(offer._id);
    offer.$delete({id: offer._id}, function() {
      nwNotifier.notify('Offer deleted');
      $route.reload();
    });
  };
  $scope.resolveReport = function(report) {
    report.$update({id : report._id}).then(function(){
      $route.reload();
      nwNotifier.notify('Report marked as resolved');
    });
  };
});