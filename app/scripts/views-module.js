/*globals requester*/
const CACHED_TEMPLATES = {};
let views = {
  get: function (name) {
    if (CACHED_TEMPLATES[name]) {
      return Promise.resolve(CACHED_TEMPLATES[name])
    }

    let url = `views/templates/${name}.handlebars`;

    let template = requester.get(url);


    CACHED_TEMPLATES[name] = template;

    return template;
  }
};
