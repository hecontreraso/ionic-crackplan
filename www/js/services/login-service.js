angular.module('LoginService', [])
 
.service('AuthService', function($q, $http, SERVER_URL) {
  // var email = '';
  // var name = '';
  // var birthdate = '';
  // var gender = '';
  // var is_private = '';
  // var bio = '';

  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var user = {};
  var isAuthenticated = false;
  var authToken;

 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

  function storeUserCredentials(data) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, data.auth_token);
    useCredentials(data);
  }
 
  function useCredentials(data) {
    user.email = data.email;
    isAuthenticated = true;
    authToken = data.auth_token;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common.Authorization = 'Token token=' + data.auth_token;
  }

  function destroyUserCredentials() {
    authToken = undefined;
    user = {};
    isAuthenticated = false;
    $http.defaults.headers.common.Authorization = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
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
    isAuthenticated: function() {return isAuthenticated;},
    user: function() {return user;}
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