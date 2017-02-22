/*globals Navigo controller homeData userData homeController userController views*/
'use strict';
let home = homeController.get(homeData, views);
let user = userController.get(userData, views);

let router = new Navigo(null, false);

//Start of Routes
router
  .on('/',home.getHome)
  .on('/register', user.register)
  .on('/login', user.login)
  .on('/logout', user.logout)
  .resolve();
