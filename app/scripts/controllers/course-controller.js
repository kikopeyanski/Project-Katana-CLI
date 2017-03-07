/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let courseController = {
  get: function (dataService, views) {
    return {
      getCourseById(params){

        let id = params.id;

        dataService.getCourseById(id)
          .then(course => {
            console.log(course);
            views.get('course-info')
              .then((template) => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(course);

                $('.content').html(html);

                $('.sign-course').on('click', function () {
                  authHelper.getCurrentUser()
                    .then(user => {
                      console.log(user);
                      let username = user.username;
                      let body = {
                        id: id
                      };
                      dataService.addCourseToUser(username, body)
                        .then(
                          console.log('course added to user successfully')
                        )
                    })
                })
              })
          })
      },
      getCourseHomework(params)
      {
        dataService.getCourseHomework(params.id)
          .then(homework => {
            console.log('returning from data' + homework);
          })
      }
      ,
    }
  }
};
