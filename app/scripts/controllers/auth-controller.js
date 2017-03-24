/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let authController = {
  //request data and views
  get: function (dataService,views) {
    return {
      renderUI(){
        authHelper.authenticateUser()
          .then(user => {
            console.log(user);
            //magic...
            user.isAdmin = user.isAdmin === 'true';
            user.notificationCount = user.notifications.length;
            views.get('nav-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(user);
                $('.header').html(html);
                eventHandler.navbarSearch();
                eventHandler.navbarHide();
                eventHandler.userNotifications(dataService.notificationSeen,user.username)
              });


            views.get('side-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(user);
                $('.sidebar').html(html);

                $('.button-completed').on('click', function () {
                  window.location = 'http://localhost:9000/#/user-panel';
                  $('.button-pending').removeClass('selected');
                  $(this).addClass('selected');
                });

                $('.button-pending').on('click', function () {
                  window.location = 'http://localhost:9000/#/courses/all';
                  $('.button-completed').removeClass('selected');
                  $(this).addClass('selected');
                });
              });
            $('.sidebar').css('display', 'block')
          })
          .catch(user => {
            views.get('nav-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc();
                $('.header').html(html);

                eventHandler.navbarHide();

                $('.sidebar').css('display', 'none')
              });

          })
      }
    }
  }
};
