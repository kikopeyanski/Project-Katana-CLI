/*globals constants & requester*/
'use strict';

let courseData = {
  getCourseById: function (id) {
    return Promise.resolve('reached course data' + ' ' + id);
  }
};
