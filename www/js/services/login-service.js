angular.module('LoginService', [])
 
.service('AuthService', function($q, $http, SERVER_URL, $ionicHistory) {

  var isAuthenticated = false;
  var userId = '';
  var authToken = '';
 
  function loadUserCredentials() {
    var auth_token = window.localStorage.getItem('TOKEN_KEY')
    var id = window.localStorage.getItem('id');
    
    if (auth_token) setUserCredentials(id, auth_token);
  }

  function storeUserCredentials(data) {
    window.localStorage.setItem('TOKEN_KEY', data.auth_token);

    window.localStorage.setItem('id', data.id);
    window.localStorage.setItem('email', data.email);
    window.localStorage.setItem('name', data.name);
    window.localStorage.setItem('birthdate', data.birthdate);
    window.localStorage.setItem('gender', data.gender);
    window.localStorage.setItem('is_private', data.is_private);
    window.localStorage.setItem('bio', data.bio);

    setUserCredentials(data.id, data.auth_token);
  }
 
  function setUserCredentials(id, auth_token) {
    userId = id;
    isAuthenticated = true;
    authToken = auth_token;

    // Set the token as header for requests
    $http.defaults.headers.common.Authorization = 'Token token=' + auth_token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    userId = undefined;
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.clear();
    $ionicHistory.clearCache();
  }

  var login = function(email, pw) {
    return $q(function(resolve, reject) {

      $http.post(SERVER_URL + '/login', { email: email, password: pw })
      .success(function(data){
        storeUserCredentials(data);
        resolve('Login success.');
      })
      .error(function(){
        reject('Login Failed.');
      });
    });
  };
 
  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    userId: function() {return userId;},
    isAuthenticated: function() {return isAuthenticated;}
  };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated
      }[response.status], response);
      return $q.reject(response);
    }
  };
})
 
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
});