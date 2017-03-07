/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let userController = {
    //request data and views
    get: function (dataService, views) {
      return {
        getUserPanel(params){
          dataService.getUserPanel(params)
            .then(courses => {
              views.get('user-courses')
                .then(template => {
                  console.log(courses);
                  let templateFunc = handlebars.compile(template);
                  let html = templateFunc(courses);

                  $('.content').html(html);
                })
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
                console.log('here');
                let username = $('#username').val();
                let password = $('#password').val();

                let userData = {
                  username: username,
                  password: password
                };

                dataService.login(userData)
                  .then(response => {
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
                user.isAdmin = (user.roles.indexOf('admin') > -1);

                //get navbar for current user
                views.get('nav-home')
                  .then(template => {
                    let templateFunc = handlebars.compile(template);
                    let html = templateFunc(user);
                    $('.header').html(html);
                  });
                //get sidebar for currentuser
                views.get('side-home')
                  .then(template => {
                    let templateFunc = handlebars.compile(template);
                    let html = templateFunc(user);
                    $('.sidebar').html(html);
                  });

                return Promise.resolve(user.username)

              }
            )
            .catch(
              views.get('nav-home')
                .then(template => {

                  let templateFunc = handlebars.compile(template);
                  let html = templateFunc();
                  $('.header').html(html);

                  return Promise.resolve()
                })
            );
        }
      }
    }
  }
  ;
