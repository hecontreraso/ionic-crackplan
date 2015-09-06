angular.module('NotificationsController', ['NotificationsService'])

.controller('NotificationsCtrl', function($scope, $state, $http, NotificationsService) {

  $scope.$on('$ionicView.enter', function(e) {
    NotificationsService.getFeed().then(function(data){
      $scope.notifications = formatData(data);
    });
  });

  function formatData(notifications){
    notifications.forEach(function(notification){
      if(notification.owner.image === null)
        notification.owner.image = '../img/profile_missing.png';

      notification.link = '#/tab/profile/' + notification.owner.id;

      switch(notification.type){
        case "follow.following":
          notification.text = "Is following you";
          break;
        case "follow.requested":
          notification.text = "Has requested to follow you";
          break;
        case "follow.accepted":
          notification.text = "Has accepted your follow request";
          break;
        case "assistant.create":
          notification.text = "Is going to your event";
          notification.show_event_image = true;
          if(notification.parameters.event_image){
            notification.event_image = notification.parameters.event_image;
          }
          else{
            notification.event_image = '../img/event_missing.jpg';
          }
          break;
      }
    });
    return notifications;
  }

  $scope.acceptRequest = function(user_id){
    NotificationsService.acceptRequest(user_id);
  }

  $scope.declineRequest = function(user_id){
    NotificationsService.declineRequest(user_id);
  }

});