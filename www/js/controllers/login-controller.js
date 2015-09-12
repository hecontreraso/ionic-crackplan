angular.module('LoginController', ['LoginService'])

.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService) {
  $scope.data = {};

  $scope.login = function(data) {

    AuthService.login(data.email, data.password).then(function(authenticated) {
      $state.go('tab.dash', {}, {reload: true});
      $scope.setUserId(AuthService.userId());
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  };

  $scope.logout = function(){
    AuthService.logout();
    $scope.setUserId(AuthService.userId());
    $state.go('login', {}, {reload: true});
  };
});
