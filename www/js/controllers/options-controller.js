angular.module('OptionsController', [])

.controller('OptionsCtrl', function($scope, $state, AuthService) {

	$scope.$on('$ionicView.beforeEnter', function(){

		console.log('PAge loaded');
		
	});

  $scope.settings = {
    enableFriends: true
  };

  $scope.logout = function() {
    AuthService.logout();
    $state.go('login');
  };
});