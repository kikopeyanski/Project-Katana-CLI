/*globals constants & requester*/
'use strict';

let adminData = {
  createCourse: function (body) {
    return requester.postJSON(constants.serverUrl + 'courses/upload', body);
  }
};
