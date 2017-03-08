/*globals constants & requester*/
'use strict';

let homeData = {
  getHomeData : function () {
    return requester.getJSON(constants.serverUrl+ 'courses/all');
  },
  getUserPanel: function (username) {
    return requester.getJSON(constants.serverUrl + 'api/users/user/' + username + '/courses');
  },
};
