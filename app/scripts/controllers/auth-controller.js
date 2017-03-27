/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let authController = {
  //request data and views
  get: function (dataService, views) {
    return {
      renderUI(){
        authHelper.authenticateUser()
          .then(user => {
            //magic...
            user.isAdmin = user.roles.indexOf('admin') !== -1;
            user.notificationCount = user.notifications.length;
            console.log(user);
            views.get('nav-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(user);
                $('.header').html(html);
                eventHandler.navbarSearch();
                eventHandler.navbarHide();
                eventHandler.userNotifications(dataService.notificationSeen, user.username)
              });


            views.get('side-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(user);
                $('.sidebar').html(html);

                $('.button-completed').on('click', function () {
                  window.location = 'https://kikopeyanski.github.io/Project-Katana/#/user-panel';
                  $('#sidebar-wrapper button').each(function () {
                    $(this).removeClass('selected');
                  });
                  $(this).addClass('selected');
                });

                $('.button-pending').on('click', function () {
                  window.location = 'https://kikopeyanski.github.io/Project-Katana/#/courses/all';
                  $('#sidebar-wrapper button').each(function () {
                    $(this).removeClass('selected');
                  });
                  $(this).addClass('selected');
                });

                $('.button-calendar').on('click', function () {
                  window.location = 'https://kikopeyanski.github.io/Project-Katana/#/user-calendar';
                  $('#sidebar-wrapper button').each(function () {
                    $(this).removeClass('selected');
                  });
                  $(this).addClass('selected');
                });
                $('.button-logout').on('click', function () {
                  window.location = 'https://kikopeyanski.github.io/Project-Katana/#/logout';
                  $('.sidebar').css('display', 'none');

                })
              });
            $('.sidebar').css('display', 'block');
            // window.location.replace('#/user-panel');
          })
          .catch(user => {
            views.get('nav-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc();
                $('.header').html(html);

                eventHandler.navbarHide();

                $('.sidebar').css('display', 'none');
                window.location.replace('#/login');
              });

          })
      }
    }
  }
};
