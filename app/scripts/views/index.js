/*globals* requester*/
let views = {
  get: function (name) {
    let url = `scripts/views/${name}.handlebars`;
    return requester.get(url);
  }
};
