/*globals Navigo controller data views*/
'use strict';
let home = homeController.get(homeData, views);

let router = new Navigo(null, false);

//Start of Routes
router
  .on(home.getHome())
  .resolve();
