'use strict';
(function () {
  var GOODS_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
  var GOODS_PICTURES = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
  var GOODS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
  //var goods = createGoodsArray(6);
  var successHandler = function (goods) {
    window.goods = goods;
  };

  //window.goods;
  // random data function
  function randomizeData(data, stringValue) {
    var item = Math.floor(Math.random() * data.length);
    if (stringValue) {
      var string = '';
      for (var i = 0; i < item; i++) {
        if (i === item - 1) {
          string += data[i];
        } else {
          string += data[i] + ', ';
        }
      }
      return string;
    } else {
      return data[item];
    }
  }
  // random number
  function randomizeNumber(value) {
    var number = Math.round(Math.random(value));
    return number;
  }
  // random numbers from interval
  function randomizeNumbersFromInterval(value01, value02) {
    var number;
    for (var i = value01; i < value02; i++) {
      number = Math.floor(Math.random() * i);
    }
    return number;
  }
  // final goods array
  function createGoodsArray(elements) {
    var goodsArray = [];
    for (var i = 0; i < elements; i++) {
      goodsArray[i] = {
        name: randomizeData(GOODS_NAMES),
        picture: randomizeData(GOODS_PICTURES),
        amount: randomizeNumbersFromInterval(0, 20),
        price: randomizeNumbersFromInterval(100, 1500),
        weight: randomizeNumbersFromInterval(30, 300),
        rating: {
          value: randomizeNumbersFromInterval(1, 5),
          number: randomizeNumbersFromInterval(10, 900)
        },
        nutritionFacts: {
          sugar: randomizeNumber(1),
          energy: randomizeNumbersFromInterval(70, 500),
          contents: randomizeData(GOODS_CONTENTS, true)
        }
      };
    }
    return goodsArray;
  }



  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style =
      'z-index: 100; margin: 0 auto; text-align: center;' +
      'background-color: white; color: red; box-shadow: 0 0 10px rgba(0,0,0,1);' +
      'padding:25px 0; border-bottom: 4px solid black';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

})();
