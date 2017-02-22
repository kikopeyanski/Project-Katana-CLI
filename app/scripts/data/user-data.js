/*globals constants & requester*/
'use strict';

let userData = {
  register: function (body) {
    return requester.postJSON(constants.serverUrl + 'api/auth/register', body);
  },
  login: function (body) {
    return requester.postJSON(constants.serverUrl + 'api/auth/login', body);
  }
};
