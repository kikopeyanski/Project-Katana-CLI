/*globals $ data tempaltes Handlebars views*/

const handlebars = handlebars || Handlebars;

let courseController = {
  get: function (dataService, views) {
    return {
      getCourseById(params){
        dataService.getCourseById(params.id)
          .then(msg => {
            console.log(msg);
          })
      }
    }
  }
};
