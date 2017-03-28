require('nightwatch/bin/runner.js');

let clientLoginPageUrl = 'https://kikopeyanski.github.io/Project-Katana/#/login';
let invalidUsername = 'Definitely an invalid username';
let validUsername = 'kikopeyanski';
let invalidPassword = 'inv';
let validPassword = 'kikopeyanski';

module.exports = {
  beforeEach: function (client) {
    console.log('Setting up...');
    client
      .url(clientLoginPageUrl)
      .waitForElementVisible('body', 5000)

  },
  'Login page shows login form': function (client) {
    client
      .assert.visible('.login-form')
      .assert.visible('input[type=text]#username')
      .assert.visible('input[type=password]#password')
      .assert.visible('input[type=submit]#login-submit')
      .end()
  },
  'Login submit return valid message after invalid username is entered':function (client) {
    client
      .setValue('input[type=text]#username', invalidUsername)
      .setValue('input[type=password]#password', validPassword)
      .click('input[type=submit]#login-submit')
      .pause(2000)
      .assert.containsText('.toast-message', 'Incorrect username or password')
      .end();
  },
  'Login submit return valid message after invalid password is entered':function (client) {
    client
      .setValue('input[type=text]#username', validUsername)
      .setValue('input[type=password]#password', invalidPassword)
      .click('input[type=submit]#login-submit')
      .pause(2000)
      .assert.visible('.toast-message')
      .assert.containsText('.toast-message', 'Incorrect username or password')
      .end();
  },
  'Login submit redirects to user-panel page when correct username and password are entered': function (client) {
    client
      .setValue('input[type=text]#username', validUsername)
      .setValue('input[type=password]#password', validPassword)
      .click('input[type=submit]#login-submit')
      .pause(3000)
      .assert.urlContains('user-panel')
      .assert.containsText('.user-username',validUsername)
      .end();
  }
};
