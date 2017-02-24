/*globals constants & requester*/
'use strict';

let userData = {
  getUserPanel: function (params) {
    return requester.getJSON(constants.serverUrl + 'api/users/user/'+ params.username + '/courses');
  },
  register: function (body) {
    return requester.postJSON(constants.serverUrl + 'api/auth/register', body);
  },
  login: function (body) {
    return requester.postJSON(constants.serverUrl + 'api/auth/login', body);
  }
};
