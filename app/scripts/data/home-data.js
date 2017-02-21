/*globals constants & requester*/
'use strict';

let homeData = {
  getHomeData : function () {
    console.log("requester");
    return requester.getJSON(constants.serverUrl+ 'courses/all');
  }
};
