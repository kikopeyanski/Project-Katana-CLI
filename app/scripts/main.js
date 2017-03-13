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
  .on('/register', user.register)
  .on('/login', user.login)
  .on('/logout', user.logout)
  .on('/courses/all', course.getAllCourses)
  .on('/course/:id/homework', course.getCourseHomework)
  .on('/course/:id', course.getCourseById)
  .on('/admin/courses/create', admin.createCourse)
  .resolve();


let data = [
  {
    "category": "Monday",
    "open1": "JAN 20 1997 12:00",
    "open2": "JAN 20 1997 13:00",
    "close1": "JAN 20 1997 14:00",
    "close2": "JAN 20 1997 15:00"
  },
  {
    "category": "Tuesday",
    "open": "JAN 20 1997 10:00",
    "close": "JAN 20 1997 12:00"
  },
  {
    "category": "Wednesday",
    "open": "JAN 20 1997 10:00",
    "close": "JAN 20 1997 12:00"
  },
  {
    "category": "Thursday",
    "open": "JAN 20 1997 10:00",
    "close": "JAN 20 1997 12:00"
  },
  {
    "category": "Friday",
    "open": "JAN 20 1997 10:00",
    "close": "JAN 20 1997 12:00"
  }
];

calendarFunc(data);
