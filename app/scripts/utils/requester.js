/* globals $ Promise */

let requester = {
  get(url) {
    let promise = new Promise((resolve, reject) => {
      $.ajax({
        url,
        method: "GET",
        success(response) {
          resolve(response);
        }
      });
    });
    return promise;
  },
  putJSON(url, body, options = {}) {

    //send request token
    let token = window.localStorage.getItem('jwt-token');

    let promise = new Promise((resolve, reject) => {

      $.ajax({
        url,
        headers: {
          'authorization': token
        },
        method: "PUT",
        async: true,
        cache: false,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(body),
        success(response) {
          resolve(response);
        },
        error(err) {
          reject(err);
        }
      });
    });
    return promise;
  },
  postJSON(url, body, options = {}) {

    //send token to the server
    let token = window.localStorage.getItem('jwt-token');

    let promise = new Promise((resolve, reject) => {
      $.ajax({
        url,
        headers: {
          'authorization': token
        },
        method: "POST",
        async: true,
        cache: false,
        processData: false,
        contentType: "application/json",
        data: JSON.stringify(body),
        success(response) {
          resolve(response);
        },
        error(err) {
          reject(err);
        }
      });
    });
    return promise;
  },
  postWithFile(url, data){
    //send token to the server
    let token = window.localStorage.getItem('jwt-token');

    let promise = new Promise((resolve, reject) => {
      $.ajax({
        url,
        headers: {
          'authorization': token
        },
        method: "POST",
        data,
        contentType: false,
        async: true,
        cache: false,
        enctype: "multipart/form-data",
        processData: false,
        success(response) {
          resolve(response);
        },
        error(err) {
          reject(err);
        }
      });
    });
    return promise;
  },
  getJSON(url) {
    //send token to the server

    let token = window.localStorage.getItem('jwt-token');

    let promise = new Promise((resolve, reject) => {
      $.ajax({
        url,
        beforeSend: function (xhr) {
          xhr.setRequestHeader('authorization', token);
        },
        method: "GET",
        contentType: "application/json",
        success(response) {
          resolve(response);
        },
        error(err) {
          reject(err);
        }
      });
    });
    return promise;
  }
};
