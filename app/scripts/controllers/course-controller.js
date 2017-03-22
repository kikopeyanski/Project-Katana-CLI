/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;
HandlebarsIntl.registerWith(handlebars);

let courseController = {
    get: function (dataService, views) {
      return {
        getAllCourses(){
          let courses;
          dataService.getAllCourses()
            .then(response => {
              courses = response;
              return views.get('courses-all')
            })
            .then((template) => {
              let templateFunc = handlebars.compile(template);
              let html = templateFunc(courses.result);

              $('.content').html(html);
            })
        },
        getCourseById(params){
          let id = params.id;
          dataService.getCourseById(id)
            .then(response => {
                views.get('course-info')
                  .then((template) => {

                      let templateFunc = handlebars.compile(template);
                      let html = templateFunc(response);

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
                      $('#course-calendar').fullCalendar({
                        events: response.result.course.lectures.map((lecture) => {
                          return {
                            title: lecture.name,
                            start: lecture.date,
                            allDay: true
                          };
                        }),
                        color: response.result.course.color,
                        contentHeight: 250,
                        aspectRatio: 2,
                        firstDay: 1
                      });

                      let comments = $('.comments-all');
                      comments.scrollTop($(comments)[0].scrollHeight);
                      $('input[name=hw]').click(function () {
                        if ($('input[name="hw"]:checked')[0]) {
                          $('.homework').css('display', 'block');
                        } else {
                          $('.homework').css('display', 'none');
                        }

                      });
                      $('.add-course').on('click', function () {
                        dataService.addCourseToUser(username, body)
                          .then(
                            console.log('course ' + response.result.course.name + ' added to user ' + username + ' successfully')
                          )
                          .catch(err => {
                            console.log(err);
                          })

                      });
                      $('.remove-course').on('click', function () {
                        console.log('removing');
                        dataService.removeCourseFromUser(username, body)
                          .then(response => {
                              console.log(response)

                            }
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
                      $('#form-new-comment').submit(function (ev) {
                          ev.preventDefault();
                          if ($(this).find('textarea').val()) {
                            let body = {
                              commentText: $('#commentText').val()
                            };
                            dataService.addCommentToCourse(id, body)
                              .then(comment => {
                                views.get('comment')
                                  .then(template => {
                                    let templateFunc = handlebars.compile(template);
                                    let html = templateFunc(comment);

                                    $('.comments-all').append(html);
                                    comments.scrollTop($(comments)[0].scrollHeight);
                                  });

                                $(this).find('textarea').val("");
                              })
                              .catch(function () {
                                console.log('error registering')
                              });
                          }
                          return false;
                        }
                      )
                    }
                  )
              }
            )
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
  }
;
