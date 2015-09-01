angular.module('EventService', [])

.factory('EventService', function($http, SERVER_URL){
	var events = [];
	
	return {
		GetFeed: function(event_index){
			return $http.get(SERVER_URL + '/events/' + event_index)
			.then(function(response){
				return response.data;
			});
		},
		toggleAssistance: function(event){
			return $http.post(SERVER_URL + '/events/' + event.id + '/toggle_assistance/')
			.then(function(response){
				return response.data.user_is_going;
			});
		}
	}
});