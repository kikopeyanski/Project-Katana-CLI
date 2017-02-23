/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let adminController = {
  //request data and views
  get: function (dataService, views) {
    return {
      createCourse(){

        authHelper.getCurrentUser()
          .then(user => {
            console.log(user.roles.indexOf('admin')=== -1);
            if (user.roles.indexOf('admin') != -1) {
              views.get('admin-create-course')
                .then((template) => {
                  let templateFunc = handlebars.compile(template);
                  let html = templateFunc();

                  $('.content').html(html);
                })
            }
            else {
              views.get('authentication-required')
                .then((template) => {
                  let templateFunc = handlebars.compile(template);
                  let html = templateFunc();

                  $('.content').html(html);
                })
            }
          }).catch(err => {
          console.log(err);
        });

      }
    }
  }
};
