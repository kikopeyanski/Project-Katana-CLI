/*globals constants & requester*/
'use strict';

let courseData = {
  getAllCourses: function () {
    return requester.getJSON(constants.serverUrl + 'courses/all')
  },
  getCourseById: function (id) {
    return requester.getJSON(constants.serverUrl + 'courses/course/' + id);
  },
  getCourseHomework: function (id) {
    //TODO Change
    return Promise.resolve('reached course homework' + id);
  },
  addCourseToUser: function (username, body) {
    return requester.postJSON(constants.serverUrl + 'api/users/user/' + username + '/courses', body)
  },
  addLectureToCourse: function (courseId, body) {
    return requester.putJSON(constants.serverUrl +'courses/course/' + courseId, body);
  }
};
