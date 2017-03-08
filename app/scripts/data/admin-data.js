/*globals constants & requester*/
'use strict';

let adminData = {
  createCourse: function (data) {
    return requester.postWithFile(constants.serverUrl + 'courses/upload', data);
  }
};
