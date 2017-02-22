/*globals constants & requester*/
'use strict';

let homeData = {
  getHomeData : function () {
    return requester.getJSON(constants.serverUrl+ 'courses/all');
  }
};
