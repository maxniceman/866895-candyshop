'use strict';
(function () {

  var successHandler = function (goodsArray) {
    window.catalog.fillTemplate(goodsArray);
  };
  var errorHandler = function (errorMessage) {
    window.modals.openModal(window.errorModal, errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
