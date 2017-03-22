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
            window.location.replace('/#/login');
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
  }
};
