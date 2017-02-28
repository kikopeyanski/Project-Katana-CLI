/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let courseController = {
  get: function (dataService, views) {
    return {
      getCourseById(params){
        dataService.getCourseById(params.id)
          .then(course => {
            views.get('course-info')
              .then((template) => {
                let templateFunc = handlebars.compile(template);
                let html = templateFunc(course);

                $('.content').html(html);


                console.log(course);
              })
          })
      },
      getCourseHomework(params)
      {
        console.log('user controller reached');
        dataService.getCourseHomework(params.id)
          .then(homework => {
            console.log('returning from data' + homework);
          })
      }
      ,
    }
  }
};
