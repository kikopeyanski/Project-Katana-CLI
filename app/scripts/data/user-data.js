/*globals constants & requester*/
'use strict';

let userData = {
  getUserPanel: function (params, username) {
    return requester.getJSON(constants.serverUrl + 'api/users/user/' + username + '/courses');
  },
  register: function (data) {
    return requester.postWithFile(constants.serverUrl + 'api/auth/register', data);
  },
  login: function (body) {
    return requester.postJSON(constants.serverUrl + 'api/auth/login', body);
  }
};
