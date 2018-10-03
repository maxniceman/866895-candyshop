'use strict';
(function () {
  var modals = document.querySelectorAll('.modal');
  var successModal = document.querySelector('.modal--success');
  var errorModal = document.querySelector('.modal--error');

  window.successModal = successModal;
  window.errorModal = errorModal;

  window.modals = {
    openModal: function (elem, message) {
      elem.classList.remove('modal--hidden');
      if (message) {
        elem.querySelector('.modal__message--error').textContent = message;
      }
      document.addEventListener('keydown', onModalEscPress);
      document.addEventListener('click', onModalCloseClick);
    }
  };

  // handlers
  var onModalEscPress = function (evt) {
    window.util.isEscEvent(evt, closeModal);
  };

  var closeModal = function () {
    for (var i = 0; i < modals.length; i++) {
      if (!modals[i].classList.contains('modal--hidden')) {
        modals[i].classList.add('modal--hidden');
      }
    }
    document.removeEventListener('keydown', onModalEscPress);
    document.removeEventListener('click', onModalCloseClick);
  };

  var onModalCloseClick = function (evt) {
    var target = evt.target;
    if (target.classList.contains('modal__close')) {
      closeModal(evt);
    }
  };
})();
