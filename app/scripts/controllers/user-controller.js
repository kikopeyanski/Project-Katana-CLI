/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let userController = {
  //request data and views
  get: function (dataService, views, auth) {
    return {
      getUserPanel(params) {
        authHelper.getCurrentUser()
          .then(user => {
            dataService.getUserPanel(params, user.username)
              .then(courses => {
                views.get('user-courses')
                  .then(template => {
                    let templateFunc = handlebars.compile(template);
                    let html = templateFunc(courses.result);

                    $('.content').html(html);
                  })
              })
          })
      },
      register() {
        views.get('register')
          .then(template => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc();
            $('.content').html(html);

            $('#user-create-user').submit(function (ev) {
              ev.preventDefault();

              let data = new FormData($(this)[0]);

              dataService.register(data)
                .then(function () {
                  console.log('successfully registered');
                })
                .then(
                  dataService.login(data)
                )
                .catch(function () {
                  console.log('error registering')
                });

              return false;
            })
          });
        return Promise.resolve();
      },
      login() {
        views.get('login')
          .then(template => {
              let templateFunc = handlebars.compile(template);
              let html = templateFunc();
              $('.content').html(html);

              $('#login-submit').on('click', function () {
                let username = $('#username').val();
                let password = $('#password').val();

                let userData = {
                  username: username,
                  password: password
                };

                dataService.login(userData)
                  .then(response => {
                    window.localStorage.setItem('current-user-username', response.username);
                    window.localStorage.setItem('current-user-image', response.image);
                    window.localStorage.setItem('current-user-admin', response.isAdmin);
                    window.localStorage.setItem('current-user-id',response._id);
                    window.localStorage.setItem('jwt-token', response.token);
                    window.location.replace('/#/user-panel');
                    auth.renderUI();
                  })
                  .catch(err => {
                    console.log(err);
                  })
              })
            }
          )
      },
      logout(){
        window.localStorage.setItem('jwt-token', '');
        window.localStorage.removeItem('current-user-username');
        window.localStorage.removeItem('current-user-image');
        window.localStorage.removeItem('current-user-admin');
        window.localStorage.removeItem('current-user-id');
        window.location.replace('/#');
        auth.renderUI();
      }
    }
  }
};
