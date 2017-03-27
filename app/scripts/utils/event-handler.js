let eventHandler = {
    userSettingsEvent(user, action){
      return new Promise((resolve, reject) => {

        $('#user-settings-form').on('submit', function (ev) {
          ev.preventDefault();
          let data = {
            newPassword: $('#newPassword').val(),
            currentPassword: $('#currentPassword').val(),
            email: $('#email').val()
          };

          action(user.username, data)
            .then(response => {
              resolve(response);
            })
            .catch(err => {
              reject(err.responseText);
            })
        })
      })
    },
    userAvatarEvent(){
      $('#input-image').change(function () {
        let input = $(this)[0];
        if (input.files && input.files[0]) {
          let reader = new FileReader();
          reader.onload = function (e) {
            $('#user-image')
              .attr('src', e.target.result);
            $('.register-user-image')
              .css('display', 'block');
          };
          reader.readAsDataURL(input.files[0]);
        }
      });
    },
    userAvatarChangeEvent(action, username){
      return new Promise((resolve, reject) => {
        $('#user-avatar-form').submit(function (ev) {
          animation.start();
          ev.preventDefault();
          let data = new FormData($(this)[0]);

          action(username, data)
            .then((response) => {
              $('.user-username img').attr('src', constants.serverUrl + 'image/' + response);
              toastr['success']('User avatar successfully changed!');
              animation.stop();
            })
            .catch((err) => {
              animation.stop();
              toastr['error'](JSON.parse(err.responseText).message);
            });
          return false;
        });
      })
    },
    userRegisterFormChangeEvent(){
      $('#user-create-user').change(function () {
        let formData = $('#user-create-user').serializeArray();
        formValidation.validateForm(formData, $(this));
        return false; //don't submit
      });
    },
    userRegisterFormSubmitEvent(actionRegister, actionLogin){
      return new Promise((resolve, reject) => {

        $('#user-create-user').submit(function (ev) {
          animation.start();
          ev.preventDefault();
          let data = new FormData($(this)[0]);

          actionRegister(data)
            .then((response) => {
              animation.stop();
              window.location.replace('Project-Katana/#/login');
              toastr['success'](response.message);
            })
            .catch((err) => {
              animation.stop();
              console.log(err);
              toastr['error'](JSON.parse(err.responseText).message);
            });

          return false;
        })
      })
    },
    userLoginFormSubmit(action){

      return new Promise((resolve, reject) => {
        $('#login-submit').on('click', function () {
          animation.start();
          let username = $('#username').val();
          let password = $('#password').val();

          let userData = {
            username: username,
            password: password
          };

          action(userData)
            .then(result => {
              animation.stop();
              resolve(result)
            })
            .catch(err => {
              animation.stop();
              console.log(err);
              $('#password').val('');
              toastr['error']('Incorrect username or password');
            })
        })

      })
    },
    navbarSearch(){
      let searchBar = $('#search-value');
      $('#zoom-icon').on('click', function () {
        searchBar.css('display', 'inline-block');
        searchBar.focus();
      });
      searchBar.on('input', function (ev) {
        window.location.replace('/#/courses/all');
        $('.course').each(function () {
          let courseData = $(this).find('.course-info').find('a').html().toLowerCase().indexOf(searchBar.val().toLowerCase());
          if (courseData !== -1
            && searchBar.val() !== '') {
            $(this).addClass('found');
            $(this).removeClass('not-found');
          } else if (searchBar.val() === '') {
            $(this).removeClass('not-found');
            $(this).removeClass('found');
          } else {
            $(this).removeClass('found');
            $(this).addClass('not-found');
          }

          // if ($(`${course} span`).val().indexOf(searchBar.val()) !== -1) {
          //   $(`${course}`).css('border-colo', 'red');
          // }
        })
      })
    },
    navbarHide(){
      let width = $(window).width();
      if (width > 240 && width < 460) {
        $(window).scroll(function () {
          if ($(this).scrollTop() > 200) {
            $('.header').slideUp(500);
          } else {
            $('.header').slideDown(500);
          }
        });
      }
    },
    userNotifications(action, username){
      let notificationIcon = $('#bell-icon');
      let notificationPanel = $('.notification-panel');
      notificationIcon.on('click', function () {
          $('.notification-count').hide();
          if (notificationIcon.hasClass('clicked')) {
            notificationPanel.hide();
            notificationIcon.removeClass('clicked');
          } else {
            notificationPanel.slideDown();
            notificationIcon.addClass('clicked');
          }

          $('.notification').one('mouseover', function () {
            let id = $(this).attr('id');

            let body = {
              id: id
            };


            action(username, body)
              .then(response => {
                console.log(response);
                $(this).animate({
                  backgroundColor: '#ffffff'
                }, 1000);
              })


          })
        }
      )
      ;
    }
  }
;
