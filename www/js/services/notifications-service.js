angular.module('NotificationsService', [])

.factory('NotificationsService', function($http, SERVER_URL, $ionicPopup){
	var events = [];
	
	return {
		getFeed: function(){
			return $http.get(SERVER_URL + '/notifications')
			.then(function(response){
				return response.data;
			});
		},
		acceptRequest: function(user_id){
			return $http.post(SERVER_URL + '/notifications/'+user_id+'/accept_request')
			.then(function(response){
				return response.status;
			});
		},
		declineRequest: function(user_id){
			return $http.post(SERVER_URL + '/notifications/'+user_id+'/decline_request')
			.then(function(response){
				return response.status;
			});
		}
	}
});
