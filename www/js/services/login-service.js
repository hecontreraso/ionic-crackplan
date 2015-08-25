angular.module('LoginService', [])
 
.service('AuthService', function($q, $http, SERVER_URL) {
  var LOCAL_TOKEN_KEY = '';
  var email = '';
  var isAuthenticated = false;
  var authToken;
 
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }
 
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }
 
  function useCredentials(token) {
    email = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;
  
    // Set the token as header for your requests!
    $http.defaults.headers.common['X-Auth-Token'] = token;
  }
 
  var login = function(email, pw) {
    return $q(function(resolve, reject) {

      $http.post(SERVER_URL + '/login',
        {
          email: email, password: pw
        }
      )
      .success(function(data){
        storeUserCredentials(email + '.' + data.auth_token);
        resolve('Login success.');
      })
      .error(function(){
        reject('Login Failed.');
      });
    });
  };
 
  var logout = function() {
    authToken = undefined;
    email = '';
    isAuthenticated = false;
    $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  };
 
  loadUserCredentials();
 
  return {
    login: login,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated;},
    email: function() {return email;},
    role: function() {return role;}
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