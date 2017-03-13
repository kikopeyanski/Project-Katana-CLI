/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let authController = {
  //request data and views
  get: function (views) {
    return {
      renderUI(){
        authHelper.getCurrentUser()
          .then(user => {
            views.get('nav-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(user);
                $('.header').html(html);
              });

            //get sidebar for current user
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
          })
          .catch(user => {
            views.get('nav-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc();
                $('.header').html(html);
              });

            //get sidebar for current user
            views.get('side-home')
              .then(template => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc();
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
          })
      }
    }
  }
};
