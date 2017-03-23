/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let authController = {
  //request data and views
  get: function (views) {
    return {
      renderUI(){
        authHelper.getCurrentUser()
          .then(user => {
            //magic...
            user.isAdmin = user.isAdmin === 'true';
            views.get('nav-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(user);
                $('.header').html(html);
                eventHandler.navbarSearch();
                eventHandler.navbarHide()
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
