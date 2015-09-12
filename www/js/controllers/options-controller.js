angular.module('OptionsController', [])

.controller('OptionsCtrl', function($scope, $state, $ionicPopup, UserService, AuthService) {

  $scope.$on('$ionicView.enter', function(e) {
    $scope.privacy = UserService.loadPrivacy();
  });

  $scope.changePrivacy = function() {
    UserService.changePrivacy($scope.privacy).then(function() {
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Error!',
        template: err
      });
    });
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
    $scope.setUserId(undefined);
  };
});