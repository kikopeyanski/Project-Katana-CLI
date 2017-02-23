/*globals*/

let authHelper = {
  getCurrentUser(){
    return requester.getJSON(constants.serverUrl + 'api/auth/getLoggedUser')
  }
};
