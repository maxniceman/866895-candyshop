'use strict';
(function () {
  // random data function
  // function randomizeData(data, stringValue) {
  //   var item = Math.floor(Math.random() * data.length);
  //   if (stringValue) {
  //     var string = '';
  //     for (var i = 0; i < item; i++) {
  //       if (i === item - 1) {
  //         string += data[i];
  //       } else {
  //         string += data[i] + ', ';
  //       }
  //     }
  //     return string;
  //   } else {
  //     return data[item];
  //   }
  // }
  // // random number
  // function randomizeNumber(value) {
  //   var number = Math.round(Math.random(value));
  //   return number;
  // }
  // // random numbers from interval
  // function randomizeNumbersFromInterval(value01, value02) {
  //   var number;
  //   for (var i = value01; i < value02; i++) {
  //     number = Math.floor(Math.random() * i);
  //   }
  //   return number;
  // }
  // // final goods array
  // function createGoodsArray(elements) {
  //   var goodsArray = [];
  //   for (var i = 0; i < elements; i++) {
  //     goodsArray[i] = {
  //       name: randomizeData(GOODS_NAMES),
  //       picture: randomizeData(GOODS_PICTURES),
  //       amount: randomizeNumbersFromInterval(0, 20),
  //       price: randomizeNumbersFromInterval(100, 1500),
  //       weight: randomizeNumbersFromInterval(30, 300),
  //       rating: {
  //         value: randomizeNumbersFromInterval(1, 5),
  //         number: randomizeNumbersFromInterval(10, 900)
  //       },
  //       nutritionFacts: {
  //         sugar: randomizeNumber(1),
  //         energy: randomizeNumbersFromInterval(70, 500),
  //         contents: randomizeData(GOODS_CONTENTS, true)
  //       }
  //     };
  //   }
  //   return goodsArray;
  // }

  var successHandler = function (goodsArray) {
    window.catalog.fillTemplate(goodsArray);
  };
  var errorHandler = function (errorMessage) {
    window.modals.openModal(window.errorModal, errorMessage);
  };

  window.backend.load(successHandler, errorHandler);
})();
