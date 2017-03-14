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

                let user;
                let username;
                let body = {
                  id: id
                };

                authHelper.authenticateUser()
                  .then(response => {
                    user = response;
                    username = user.username;
                  });
                $('input[name=hw]').click(function () {
                  if ($('input[name="hw"]:checked')[0]) {
                    $('.homework').css('display', 'block');
                  } else {
                    $('.homework').css('display', 'none');
                  }

                });

                $('.sign-course').on('click', function () {
                  dataService.addCourseToUser(username, body)
                    .then(
                      console.log('course ' + response.result.course.name + ' added to user ' + username + ' successfully')
                    )
                    .catch(err => {
                      console.log(err);
                    })

                });
                $('.lecture-create-lecture-btn').on('click', function () {

                  let lecture = {
                    name: $('.lecture-name').val(),
                    date: $('.lecture-date').val(),
                    startHour: $('.lecture-startHour').val(),
                    endHour: $('.lecture-endHour').val(),
                    homework: {
                      name: $('.lecture-name').val() + 'homework',
                      deadline: $('.lecture-homework-deadline').val()
                    }
                  };

                  dataService.addLectureToCourse(id, lecture)
                    .then(() => {
                        console.log('succes')
                      }
                    )
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
