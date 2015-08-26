angular.module('ChangePasswordController', [])

.controller('ChangePasswordCtrl', function($scope, $state, $http, $ionicPopup, AuthService, SERVER_URL) {

  $scope.settings = {
    enableFriends: true
  };

  $scope.changePassword = function(user){
  	if(user.newPw  !== user.newPwConfirmation){
	    var alertPopup = $ionicPopup.alert({
	      title: 'Error',
	      template: "The entered password doesn't match!"
	    });
  	}
  	$http.post(SERVER_URL + '/change_password',
  		{
  			password: user.newPw, newPwConfirmation: user.newPwConfirmation
  		}
  	)
  	.success(function(){
	    var alertPopup = $ionicPopup.alert({
	      title: 'Success!',
	      template: 'Password changed succesfully!'
	    });
  	})
  	.error(function(data){
			console.log("Error making the request");
			console.log(data);
  	});
  };
});