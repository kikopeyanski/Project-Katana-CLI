/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let homeController = {
  //request data and views
  get: function (dataService, views) {
    return {
      getHome(){
        let courses;
        dataService.getHomeData()
          .then((data) => {
            courses = data;
            return views.get('home');
          })
          .then((template) => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc(courses);
            $('.content').html(html);
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
