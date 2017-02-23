/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let userController = {
  //request data and views
  get: function (dataService, views) {
    return {
      register(){
        views.get('register')
          .then(template => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc();
            $('.content').html(html);

            $('#register-submit').on('click', function () {

              let username = $('#username').val();
              let email = $('#email').val();
              let password = $('#password').val();
              let passwordConfirm = $('#confirm-password').val();

              let userData = {
                username: username,
                email: email,
                password: password,
                confirmedPassword: passwordConfirm
              };

              dataService.register(userData)
                .then(function () {
                  console.log('successfully registered');
                })
                .then(
                  dataService.login(userData)
                )
                .catch(function () {
                  console.log('error registering')
                })

            })


          });

      },
      login(){
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
                  window.localStorage.setItem('jwt-token', response.token);
                })
                .catch(err => {
                  console.log(err);
                })
            })
          })
      },
      logout(){
        window.localStorage.setItem('jwt-token', '');
        window.location.replace('/#')
      }
    }
  }
};
