angular.module('AddEventController', [])
// angular.module('AddEventController', ['ngCordova'])

.controller('AddEventCtrl', function(
  $scope, EventService, $ionicPlatform, $ionicActionSheet
){
 
// .controller('AddEventCtrl', function(
//   $scope, EventService, $cordovaDevice, $cordovaFile, $ionicPlatform,
//   $cordovaEmailComposer, $ionicActionSheet, ImageService, FileService
// ){

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.hours = [];
  // $scope.images = FileService.images();

  for (var i = 5; i <= 23; i++){
    hour = i;
    time_of_day = 'AM';
    if(hour > 12){
      hour-=12;
      time_of_day = 'PM';
    }
    $scope.hours.push(
      hour + ':00 ' + time_of_day,
      hour + ':30 ' + time_of_day 
    );
  }

  $scope.createEvent = function(event){
    EventService.createEvent(event);
  }
  
 
  // $scope.urlForImage = function(imageName) {
  //   var trueOrigin = cordova.file.dataDirectory + imageName;
  //   return trueOrigin;
  // }
 
  // $scope.addMedia = function() {
  //   $scope.hideSheet = $ionicActionSheet.show({
  //     buttons: [
  //       { text: 'Take photo' },
  //       { text: 'Photo from library' }
  //     ],
  //     titleText: 'Add images',
  //     cancelText: 'Cancel',
  //     buttonClicked: function(index) {
  //       $scope.addImage(index);
  //     }
  //   });
  // }
 
  // $scope.addImage = function(type) {
  //   $scope.hideSheet();
  //   ImageService.handleMediaDialog(type).then(function() {
  //     $scope.$apply();
  //   });
  // }
});
