angular.module('EventGo').controller('ReportsCreateController', function(Report, Identity, $routeParams, $scope, $location, nwNotifier){
  var id = $routeParams.id;
  $scope.identity = Identity;
  $scope.report = new Report();


  $scope.sendReport = function() {
    $scope.report.user_id = Identity.currentUser._id;
    $scope.report.event_id = id;
    $scope.report.done = false;
    $scope.report.$save().then(function(response) {
      nwNotifier.notify("Report sent successfully");
      $location.path('/events/' + id);
    });
  };
});
