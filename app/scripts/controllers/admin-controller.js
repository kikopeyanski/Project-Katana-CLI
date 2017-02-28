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
                    let homeworkQuery = $('#field').find('.input');
                    let homework = [];

                    homeworkQuery.each(function () {
                      homework.push(
                        {
                          name: $(this).val()
                        }
                      );
                    });

                    let course = {
                      name: courseName,
                      startDate: startDate,
                      endDate: endDate,
                      homework: homework
                    };

                    dataService.createCourse(course)
                      .then(msg => {
                        console.log(msg);
                      })
                  });
                  $(document).ready(function () {
                    var next = 1;
                    $(".add-more").click(function (e) {
                      e.preventDefault();
                      var addto = "#field" + next;
                      var addRemove = "#field" + (next);
                      next = next + 1;
                      var newIn = '<input autocomplete="off" class="input form-control" id="field' + next + '" name="field' + next + '" type="text">';
                      var newInput = $(newIn);
                      var removeBtn = '<button id="remove' + (next - 1) + '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
                      var removeButton = $(removeBtn);
                      $(addto).after(newInput);
                      $(addRemove).after(removeButton);
                      $("#field" + next).attr('data-source', $(addto).attr('data-source'));
                      $("#count").val(next);

                      $('.remove-me').click(function (e) {
                        e.preventDefault();
                        var fieldNum = this.id.charAt(this.id.length - 1);
                        var fieldID = "#field" + fieldNum;
                        $(this).remove();
                        $(fieldID).remove();
                      });
                    });


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
