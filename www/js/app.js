angular.module('crackplan',
  [
    'ionic',
    'AppController',
    'LoginController',
    'EventsController',
    'ProfileController',
    'AddEventController',
    'NotificationsController',
    'OptionsController',
    'EditProfileController',
    'ChangePasswordController',
    'ngOpenFB',
    'ngCordova'
  ]
)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    console.log('checking if auth');
    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })
  // Each tab has its own nav history stack:
  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-feed': {
        templateUrl: 'templates/tab-feed.html',
        controller: 'EventsCtrl'
      }
    }
  })
  .state('tab.profile', {
    url: '/profile/:userId',
    views: {
      'tab-profile': {
        templateUrl: 'templates/tab-profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('tab.add-event', {
    url: '/add-event',
    views: {
      'tab-add-event': {
        templateUrl: 'templates/add-event.html',
        controller: 'AddEventCtrl'
      }
    }
  })
  .state('tab.notifications', {
    url: '/notifications',
    views: {
      'tab-notifications': {
        templateUrl: 'templates/tab-notifications.html',
        controller: 'NotificationsCtrl'
      }
    }
  })
  .state('tab.options', {
    url: '/options',
    views: {
      'tab-options': {
        templateUrl: 'templates/tab-options.html',
        controller: 'OptionsCtrl'
      }
    }
  })
  .state('edit-profile', {
    url: '/edit-profile',
    templateUrl: 'templates/edit-profile.html',
    controller: 'EditProfileCtrl'
  })
  .state('change-password', {
    url: '/change-password',
    templateUrl: 'templates/change-password.html',
    controller: 'ChangePasswordCtrl'
  });

  // $urlRouterProvider.otherwise('/tab/dash');
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    $state.go("tab.dash");
  });
});