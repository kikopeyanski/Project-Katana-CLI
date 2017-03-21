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
              .then(response => {
                views.get('user-courses')
                  .then(template => {
                    let templateFunc = handlebars.compile(template);
                    let html = templateFunc(response.result);

                    $('.content').html(html);

                    calendarFunc(response.calendar);
                  })
              })
          })
      },
      userSettings(){
        let user;
        authHelper.getCurrentUser()
          .then(result => {
            user = result;
          });

        views.get('user-settings')
          .then(template => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc();

            $('.content').html(html);

            $('#user-settings-form').on('submit', function (ev) {
              ev.preventDefault();
              let data = {
                newPassword: $('#newPassword').val(),
                currentPassword: $('#currentPassword').val(),
                email: $('#email').val()
              };

              dataService.changeUserSettings(user.username, data)
                .then();

              return false;
            })
          })
      },
      register() {
        views.get('register')
          .then(template => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc();
            $('.content').html(html);

            $('#image').change(function () {
              let input = $(this)[0];
              if (input.files && input.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                  $('#user-image')
                    .attr('src', e.target.result);
                  $('.register-user-image')
                    .css('display', 'block');
                };
                reader.readAsDataURL(input.files[0]);
              }
            });
            $('#user-create-user').change(function () {
              let formData = $('#user-create-user').serializeArray();
              formValidation.validateForm(formData,$(this));
              return false; //don't submit
            });
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
                    window.localStorage.setItem('current-user-id', response._id);
                    window.localStorage.setItem('jwt-token', response.token);
                    window.location.replace('/#/user-panel');
                    auth.renderUI();
                  })
                  .catch(err => {
                    toastr['error']('Incorrect username or password');
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
