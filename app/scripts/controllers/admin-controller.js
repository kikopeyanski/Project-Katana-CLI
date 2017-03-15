/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let adminController = {
  //request data and views
  get: function (dataService, views) {
    return {
      createCourse(){
        authHelper.authenticateUser()
          .then(user => {
            if (user.roles.indexOf('admin') != -1) {
              views.get('admin-create-course')
                .then((template) => {
                  let templateFunc = handlebars.compile(template);
                  let html = templateFunc();

                  $('.content').html(html);

                  $('#admin-create-course').submit(function (ev) {
                    ev.preventDefault();

                    let data = new FormData($(this)[0]);
                    console.log(data);
                    console.log(data.startDate);
                    dataService.createCourse(data)
                      .then(msg => {
                        console.log(msg);
                      });

                    return false;
                  });
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
          })
          .catch(err => {
            console.log(err.responseText);
          });

      }
    }
  }
};
