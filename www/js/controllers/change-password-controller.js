angular.module('ChangePasswordController', [])

.controller('ChangePasswordCtrl', function($scope, $state, AuthService) {

	$scope.$on('$ionicView.beforeEnter', function(){

		console.log('PAge loaded');
		
	});


  $scope.settings = {
    enableFriends: true
  };

});