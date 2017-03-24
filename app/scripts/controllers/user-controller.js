/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let userController = {
  //request data and views
  get: function (dataService, views, auth) {
    return {
      getUserPanel(params) {

        animation.start();
        let template;

        views.get('user-courses')
          .then(response => {
            template = response;
            return authHelper.getCurrentUser()
          })
          .then(user => {
            return dataService.getUserPanel(params, user.username)
          })
          .then(response => {
            console.log(response);
            let templateFunc = handlebars.compile(template);
            let html = templateFunc(response);

            $('.content').html(html);

            calendarFunc(response.calendar);
          })
          .catch(err => {
            console.log(err);
          });

        animation.stop();
      },
      userSettings(){
        animation.start();
        let user;
        let template;

        views.get('user-settings')
          .then(response => {
            template = response;
            return authHelper.getCurrentUser()
          })
          .then(response => {
            user = response;
          })
          .then(() => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc();

            $('.content').html(html);

            animation.stop();
          })
          .then(() => {
            eventHandler.userSettingsEvent(user, dataService.changeUserSettings)
              .then(response => {
                console.log(response);
                toastr['success']('User settings successfully updated');
              })
              .catch(err => {
                toastr['error'](err);
              })
          });
      },
      userAvatar(){
        animation.start();
        let template;
        let user;
        authHelper.getCurrentUser()
          .then(response => {
            user = response;
          });
        views.get('user-avatar')
          .then(response => {
            template = response;
            let templateFunc = handlebars.compile(template);
            let html = templateFunc(user);
            $('.content').html(html);
            eventHandler.userAvatarEvent();
            eventHandler.userAvatarChangeEvent(dataService.changeUserAvatar, user.username);
            animation.stop();
          })

      },
      register() {
        animation.start();
        views.get('register')
          .then(template => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc();
            $('.content').html(html);

            eventHandler.userAvatarEvent();
            eventHandler.userRegisterFormChangeEvent();
            eventHandler.userRegisterFormSubmitEvent(dataService.register, dataService.login);
            animation.stop();
          });
      },
      login() {
        animation.start();
        views.get('login')
          .then(template => {
              let templateFunc = handlebars.compile(template);
              let html = templateFunc();
              $('.content').html(html);
              animation.stop();
              return eventHandler.userLoginFormSubmit(dataService.login);
            }
          )
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
            console.log(err)
          })
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
