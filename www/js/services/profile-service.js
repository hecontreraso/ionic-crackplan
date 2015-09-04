angular.module('ProfileService', [])

.factory('ProfileService', function($http, SERVER_URL, $ionicPopup){
	return {
		getProfileData: function(profile_id){
			return $http.get(SERVER_URL + '/profile/' + profile_id)
			.then(function(response){
				return response.data;
			});
		}
	}
});