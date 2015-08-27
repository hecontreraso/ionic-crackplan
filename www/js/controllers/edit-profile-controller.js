angular.module('EditProfileController', [])

.controller('EditProfileCtrl', function($scope, $state, $ionicPopup, $http, AuthService, SERVER_URL) {

	$scope.$on('$ionicView.beforeEnter', function(event){
    $scope.user = {
    	email: $scope.currentUser.email,
      fullName: $scope.currentUser.fullName,
      birthdate: new Date($scope.currentUser.birthdate),
      gender: $scope.currentUser.gender,
      bio: $scope.currentUser.bio
    };
    console.log($scope.currentUser);
	});


  $scope.saveProfile = function(user) {
  	console.log(user);
    $http.patch(SERVER_URL + '/edit_profile', 
      {
        email: $scope.user.email,
        name: $scope.user.fullName,
        birthdate: $scope.user.birthdate,
        gender: $scope.user.gender,
        bio: $scope.user.bio
      }
    )
    .success(function(){
			// Actualizar objeto user en app controller

      var alertPopup = $ionicPopup.alert({
        title: 'Success!',
        template: 'Profile updated succesfully!'
      });
    })
    .error(function(data){
      console.log("Error making the request");
      console.log(user);
    });
  };

});