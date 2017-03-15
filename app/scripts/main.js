/*globals Navigo controller homeData userData homeController userController adminController adminData views*/
'use strict';
let auth = authController.get(views);
let home = homeController.get(homeData, views);
let user = userController.get(userData, views, auth);
let admin = adminController.get(adminData, views);
let course = courseController.get(courseData, views);

let router = new Navigo(null, false);

auth.renderUI();

router.use
//Start of Routes
router
  .on(home.getHome)
  .on('/user-panel', user.getUserPanel)
  .on('/user-settings', user.userSettings)
  .on('/register', user.register)
  .on('/login', user.login)
  .on('/logout', user.logout)
  .on('/courses/all', course.getAllCourses)
  .on('/course/:id/homework', course.getCourseHomework)
  .on('/course/:id', course.getCourseById)
  .on('/admin/courses/create', admin.createCourse)
  .resolve();


