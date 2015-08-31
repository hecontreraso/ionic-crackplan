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
		// GetNewEvents: function(){
		// 	return $http.get(SERVER_URL + '/events/10').then(function(response){
		// 		events = response.data;
		// 		return events;
		// 	});
		// },
		toggleAssistance: function(event){
			$http.post(SERVER_URL + '/events/' + event.id + '/toggle_assistance/')
			.success(function(data){
				return data.user_is_going;
			})
			.error(function(){
				console.log("Error when changing assistance");
			});
		}
	}
});