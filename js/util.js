'use strict';
(function () {
  var ESC_KEYCODE = 27;
  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    findInArray: function(array, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === value) {
          return i;
        }
      }
      return -1;
    }
  };
})();
