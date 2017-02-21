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
            $('.jumbotron').html(html);
          })
      }
    }
  }
};
