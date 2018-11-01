angular.module('EventGo').config(function($routeProvider){
  var checkRouteRole = {
    admin: {auth: function(Auth) {
      return Auth.authorizeCurrentUserForRoute('admin');
    }},
    user: {auth: function(Auth) {
      return Auth.authorizeAuthenticatedUserForRoute();
    }}
  };

  $routeProvider
    .when('/', {
      redirectTo: '/events'
    })

    .when('/events', {
      templateUrl: "assets/templates/events/index.html",
      controller: "EventsIndexController"
    })

    .when('/events/new/', {
      templateUrl: "assets/templates/events/new.html",
      controller: "EventsCreateController",
      resolve: checkRouteRole.user
    })

    .when('/events/:id', {
      templateUrl: "assets/templates/events/show.html",
      controller: "EventsShowController",
      resolve: checkRouteRole.user
    })

    .when('/events/:id/edit', {
      templateUrl: "assets/templates/events/new.html",
      controller: "EventsCreateController",
      resolve: checkRouteRole.user
    })

    .when('/events/:id/newOffer', {
      templateUrl: "assets/templates/offers/new.html",
      controller: "OffersCreateController",
      resolve: checkRouteRole.user
    })

    .when('/events/:id/newOffer/:offerId', {
      templateUrl: "assets/templates/offers/new.html",
      controller: "OffersCreateController",
      resolve: checkRouteRole.user
    })

    .when('/offers/:id', {
      templateUrl: "assets/templates/offers/show.html",
      controller: "OffersShowController",
      resolve: checkRouteRole.user
    })

    .when('/users', {
      templateUrl: "assets/templates/users/index.html",
      controller: "UsersIndexController",
      resolve: checkRouteRole.admin
    })

    .when('/users/:id', {
      templateUrl: "assets/templates/users/show.html",
      controller: "UsersShowController",
      resolve: checkRouteRole.user

    })

    .when('/messages/:id1', {
      templateUrl: "assets/templates/messages/index.html",
      controller: "MessagesIndexController",
      resolve: checkRouteRole.user
    })

    .when('/signup', {
      templateUrl: "assets/templates/users/signup.html",
      controller: "UsersSignupController",
    })

    .when('/profile', {
      templateUrl: "assets/templates/users/profile.html",
      controller: "UsersProfileController",
      resolve: checkRouteRole.user
    })

    .when('/reports/:id', {
      templateUrl: "assets/templates/reports/new.html",
      controller: "ReportsCreateController",
      resolve: checkRouteRole.user

    })

    .when('/admin/', {
      templateUrl: "assets/templates/admin/index.html",
      controller: "AdminShowController",
      resolve: checkRouteRole.admin
    })

    .when('/my', {
      templateUrl: "assets/templates/users/my.html",
      controller: "UsersMyController",
      resolve: checkRouteRole.user
    })

    .otherwise({redirectTo: '/' });

});