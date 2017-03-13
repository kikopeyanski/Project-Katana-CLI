/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let courseController = {
  get: function (dataService, views) {
    return {
      getAllCourses(){
        dataService.getAllCourses()
          .then(response => {
            views.get('courses-all')
              .then((template) => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(response.result);

                $('.content').html(html);
              })
          })
      },
      getCourseById(params){
        let id = params.id;
        dataService.getCourseById(id)
          .then(response => {
            views.get('course-info')
              .then((template) => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(response.result);

                $('.content').html(html);

                $('.sign-course').on('click', function () {
                  authHelper.authenticateUser()
                    .then(user => {
                      let username = user.username;
                      let body = {
                        id: id
                      };
                      dataService.addCourseToUser(username, body)
                        .then(
                          console.log('course '+response.result.course.name +' added to user '+ username +' successfully')
                        )
                        .catch(err =>{
                          console.log(err);
                        })
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
    }
  }
};
