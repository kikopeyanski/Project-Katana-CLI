/*globals Navigo controller homeData userData homeController userController adminController adminData views*/
'use strict';
let home = homeController.get(homeData, views);
let user = userController.get(userData, views);
let admin = adminController.get(adminData, views);
let course = courseController.get(courseData, views);

let router = new Navigo(null, false);

router.use

//Start of Routes
router
  .on(home.getHome, {
    before: function (done) {
      user.currentUser();
      done();
    }
  })
  .on('/user/:username', user.getUserPanel, {
    before: function (done) {
      user.currentUser();
      done();
    }
  })
  .on('/register', user.register, {
    before: function (done) {
      user.currentUser();
      done();
    }
  })
  .on('/login', user.login, {
    before: function (done) {
      user.currentUser();
      done();
    }
  })
  .on('/logout', user.logout, {
    after: function (done) {
      user.currentUser();
      done();
    }
  })
  .on('/course/:id/homework', course.getCourseHomework, {
    before: function (done) {
      user.currentUser();
      done();
    }
  })
  .on('/course/:id', course.getCourseById, {
    before: function (done) {
      user.currentUser();
      done();
    }
  })
  .on('/admin/courses/create', admin.createCourse, {
    before: function (done) {
      user.currentUser();
      done();
    }
  })
  .resolve();
