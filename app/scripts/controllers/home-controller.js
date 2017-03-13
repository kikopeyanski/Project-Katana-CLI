/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let homeController = {
  //request data and views
  get: function (dataService, views) {
    return {
      getHome(){
        authHelper.getCurrentUser()
          .then(user => {
            user.isAdmin = user.roles.indexOf('admin') != -1;
            dataService.getUserPanel(user.username)
              .then(courses => {
                views.get('home')
                  .then(template => {
                    let templateFunc = handlebars.compile(template);
                    let html = templateFunc(courses);

                    $('.content').html(html);
                  })
              })
          })
          .catch(err => {
            views.get('authentication-required')
              .then((template) => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc();
                $('.content').html(html)
              })
          })
      }
    }
  }
};
