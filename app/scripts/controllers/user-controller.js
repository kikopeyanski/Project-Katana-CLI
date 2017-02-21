/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let userController = {
  //request data and views
  get: function (dataService, views) {
    return {
      register(){
        views.get('register')
          .then(template => {
            let templateFunc = handlebars.compile(template);
            let html = templateFunc();
            $('.content').html(html);
          });
        dataService.register()
          .then(function () {
            console.log('register succesfully');
          })
      }
    }
  }
};
