/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let adminController = {
  //request data and views
  get: function (dataService, views) {
    return {
      createCourse(){
        authHelper.getCurrentUser()
          .then(user => {
            if (user.roles.indexOf('admin') != -1) {
              views.get('admin-create-course')
                .then((template) => {
                  let templateFunc = handlebars.compile(template);
                  let html = templateFunc();

                  $('.content').html(html);

                  $('#course-create-btn').on('click', function () {
                    let courseName = $('#name').val();
                    let startDate = $('#start-date').val();
                    let endDate = $('#end-date').val();

                    let course = {
                      name: courseName,
                      startDate: startDate,
                      endDate: endDate
                    };



                    dataService.createCourse(course)
                      .then(msg => {
                        console.log(msg);
                      })
                  })
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
            console.log(err);
          });

      }
    }
  }
};
