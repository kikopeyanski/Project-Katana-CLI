let formValidation = {
  validateForm(formData, form){
    formData.forEach(function (input) {
      switch (input.name) {
        case 'username':
          break;
        case 'password':
          if (`${input.value}`.length < 4 || 25 < `${input.value}`.length) {
            $(`div.password-input`).addClass('has-danger');
            $(`div.password-input div`).css('display', 'block');
          } else {
            $(`div.password-input`).removeClass('has-danger');
            $(`div.password-input div`).css('display', 'none');
          }
          break;
        case'confirmedPassword':
          console.log($('#password').val());
          if (input.value !== $('#password').val()) {
            $(`div.confirm-password-input`).addClass('has-danger');
            $(`div.confirm-password-input div`).css('display', 'block');
          } else {
            $(`div.confirm-password-input`).removeClass('has-danger');
            $(`div.confirm-password-input div`).css('display', 'none');
          }
          break;
        case 'email':
          break;
        default:
          break;
      }
      console.log();

    })
  }
};
