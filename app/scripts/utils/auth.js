/*globals*/

let authHelper = {
  getCurrentUser(){
    let user = {
      username: window.localStorage.getItem('current-user-username'),
      image: window.localStorage.getItem('current-user-image'),
      isAdmin: window.localStorage.getItem('current-user-admin'),
      _id: window.localStorage.getItem('current-user-id')
    };

    if (user.username == null) {
      return requester.getJSON(constants.serverUrl + 'api/auth/getLoggedUser')
    }

    return Promise.resolve(user);
  },
  authenticateUser(){
    return requester.getJSON(constants.serverUrl + 'api/auth/getLoggedUser')
  }
};
