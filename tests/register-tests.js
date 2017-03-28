require('nightwatch/bin/runner.js');

let clientLoginPageUrl = 'https://kikopeyanski.github.io/Project-Katana/#/login';
let validUsername = 'kikopeyanski';
let validEmail = 'kikopeyanski@abv.bg';
let shortPassword = 'psw';
let validPassword= 'kikopeyanski';
let passwordTooShortMsg = 'Password should be between 4 and 25 characters';
let passwordsDoNotMatchMsg = 'Passwords does not match';
let differentPassword = 'kikopeyanski';
let usernameAlreadyExistMsg ='Username already exist!';

module.exports = {
  beforeEach: function (client) {
    console.log('Setting up...');
    client
      .url(clientLoginPageUrl)
      .waitForElementVisible('body', 5000)
      .click('#register-form-link')
      .waitForElementVisible('form#user-create-user', 5000)
  },
  'Register page shows form with all fields': function (client) {
    client
      .assert.visible('#user-create-user')
      .assert.visible('input[type=text]#username')
      .assert.visible('input[type=email]#email')
      .assert.visible('input[type=password]#password')
      .assert.visible('input[type=password]#confirm-password')
      .assert.visible('input[type=file]#image')
      .assert.visible('button#user-create-user-btn')
      .end()
  },
  'Register page shows password too short when password is too short and display passwords does not match when confirm password is different': function (client) {
    client
      .setValue('input[type=text]#username', validUsername)
      .setValue('input[type=password]#password', shortPassword)
      .click('input[type=password]#confirm-password')
      .waitForElementVisible('.password-input div.form-control-feedback', 5000)
      .assert.containsText('.password-input div.form-control-feedback', passwordTooShortMsg)
      .setValue('input[type=password]#confirm-password', differentPassword)
      .click('input[type=password]#password')
      .waitForElementVisible('.confirm-password-input div.form-control-feedback', 5000)
      .assert.containsText('.confirm-password-input div.form-control-feedback', passwordsDoNotMatchMsg)
      .end()
  },
  'Register submit returns message when user with the same username is already registered': function (client) {
    client
      .setValue('input[type=text]#username', validUsername)
      .setValue('input[type=email]#email',validEmail)
      .setValue('input[type=password]#password', validPassword)
      .setValue('input[type=password]#confirm-password',validPassword)
      .click('button#user-create-user-btn')
      .pause(5000)
      .waitForElementVisible('.toast-message',5000)
      .assert.containsText('.toast-message', usernameAlreadyExistMsg)
      .end();

  }
};
