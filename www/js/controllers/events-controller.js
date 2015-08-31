angular.module('EventsController', [])

.controller('EventsCtrl', function($scope, $http, $timeout, EventService) {
	$scope.events = [];
	$scope.moreDataCanBeLoaded = true;
	var event_index = 0;

	$scope.loadMore = function() {
		EventService.GetFeed(event_index).then(function(events){
			if (events.length < 2) {
        $scope.moreDataCanBeLoaded = false;
      }

			$scope.events = $scope.events.concat(events);
			event_index += events.length;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	}

	$scope.toggleAssistance = function(event){
		event.user_is_going = EventService.toggle_assistance(event);
	}
});