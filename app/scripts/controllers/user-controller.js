/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let userController = {
    //request data and views
    get: function (dataService, views) {
      return {
        getUserPanel(params){
          console.log('user controller reached');
          dataService.getUserPanel(params)
            .then(courses =>{
              console.log(courses);
            })
        },
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
          return Promise.resolve();
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
                    console.log(response.message);
                    window.localStorage.setItem('jwt-token', response.token);
                    window.location.replace('/#');
                  })
                  .catch(err => {
                    console.log(err);
                  })
              })
            })
        },
        logout(){
          window.localStorage.setItem('jwt-token', '');
          window.location.replace('/#');
        },
        currentUser(){
          authHelper.getCurrentUser()
            .then(user => {
                //load admin panel
                if (user.roles.indexOf('admin') != -1) {
                  views.get('nav-login')
                    .then(template => {
                      let templateFunc = handlebars.compile(template);
                      let html = templateFunc(user);
                      $('.nav').html(html);

                      console.log('admin');

                      return Promise.resolve()
                    })
                }
                //load regular user panel
                else {
                  views.get('nav-login')
                    .then(template => {
                      let templateFunc = handlebars.compile(template);
                      let html = templateFunc(user);
                      $('.nav').html(html);


                      console.log('not admin');
                      return Promise.resolve()
                    })
                }
              }
            )
            .catch(
              views.get('nav-home')
                .then(template => {
                  let templateFunc = handlebars.compile(template);
                  let html = templateFunc();
                  $('.nav').html(html);

                  return Promise.resolve()
                })
            );
        }
      }
    }
  }
  ;
