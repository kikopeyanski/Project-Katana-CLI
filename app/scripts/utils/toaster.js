/*globals toastr*/
'use strict';

let toaster = {
  init: function () {
    toastr.options = {
      'closeButton': false,
      'debug': false,
      'newestOnTop': false,
      'progressBar': false,
      'positionClass': 'toast-custom-position',
      'preventDuplicates': true,
      'onclick': null,
      'showDuration': '300',
      'hideDuration': '1000',
      'timeOut': '5000',
      'extendedTimeOut': '1000',
      'showEasing': 'swing',
      'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }
  }
};
