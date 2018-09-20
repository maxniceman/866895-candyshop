'use strict';
var GOODS_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var GOODS_PICTURES = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
var GOODS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

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
function randomizeNumbersFromInterval(value01, value02) {
  var number;
  if (value01 && value02) {
    for (var i = value01; i < value02; i++) {
      number = Math.floor(Math.random() * i);
    }
  } else {
    number = Math.round(Math.random(value01));
  }
  return number;
}
// final wizards array
function createGoodsArray(elements) {
  var wizardsArray = [];
  for (var i = 0; i < elements; i++) {
    wizardsArray[i] = {
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
        sugar: randomizeNumbersFromInterval(1),
        energy: randomizeNumbersFromInterval(70, 500),
        contents: randomizeData(GOODS_CONTENTS, true)
      }
    };
  }
  return wizardsArray;
}

var goodsInBasket = {};


// render goods
var renderGoods = function (good) {
  var cardItem = cardTemplate.cloneNode(true);
  cardItem.classList.remove('card--in-stock');
  if (good.amount === 0) {
    cardItem.classList.add('card--soon');
  } else if (good.amount >= 1 && good.amount < 5) {
    cardItem.classList.add('card--little');
  } else {
    cardItem.classList.add('card--in-stock');
  }

  cardItem.querySelector('.card__title').textContent = good.name;
  cardItem.querySelector('.card__img').src = good.picture;

  cardItem.querySelector('.card__price').innerHTML =
    good.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';

  var starsRating = cardItem.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');
  switch (good.rating.value){
    case 5:
      starsRating.classList.add('stars__rating--five');
    case 4:
      starsRating.classList.add('stars__rating--four');
    case 3:
      starsRating.classList.add('stars__rating--three');
    case 2:
      starsRating.classList.add('stars__rating--two');
    case 1:
      starsRating.classList.add('stars__rating--one');
  };

  cardItem.querySelector('.star__count').textContent = good.rating.number;

  var cardCharacteristic = cardItem.querySelector('.card__characteristic');
  cardCharacteristic.textContent = 'Без сахара';
  if (good.nutritionFacts.sugar) {
    cardCharacteristic.textContent = 'Содержит сахар';
  }
  cardItem.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;



  // add to favorite button
  var btnFavorite = cardItem.querySelector('.card__btn-favorite');
  btnFavorite.addEventListener('click', function (evtClick) {
    evtClick.preventDefault();
    this.classList.toggle('card__btn-favorite--selected');
  });

  // buy btn

  var btnBuy = cardItem.querySelector('.card__btn');
  btnBuy.addEventListener('click', function (evt) {
    evt.preventDefault();
    goodsInBasket = Object.assign(good);
    console.log(goodsInBasket);
  })



  return cardItem;
};


// fill template
function fillTemplate(goodsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goodsArray.length; i++) {
    fragment.appendChild(renderGoods(goodsArray[i]));
  }
  return fragment;
}

var goods = createGoodsArray(26);
//var goodsInBasket = createGoodsArray(3);


// DOM manipulation for catalog cards
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');

var cardsInBasket = document.querySelector('.goods__cards');

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.catalog__card');

catalogCards.appendChild(fillTemplate(goods));
cardsInBasket.appendChild(fillTemplate(goodsInBasket));


// hide loading data message
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');
// hide basket empty message
cardsInBasket.classList.remove('goods__cards--empty');
cardsInBasket.querySelector('.goods__card-empty').classList.add('visually-hidden');


var deliverContainer = document.querySelector('.deliver');
var deliverToggle = deliverContainer.querySelector('.deliver__toggle');
deliverToggle.addEventListener('click', function (evt) {
  changeTabs(evt, '.deliver > div');
})

function changeTabs(evt, nodes) {
  var target = evt.target;
  if (target.tagName != 'INPUT') return;
  var targetId = target.id;
  var targets = deliverContainer.querySelectorAll(nodes);
  for (var i=0; i<targets.length; i++){
    var targetEl = targets[i];
    var hasThisElement = false;
    targetEl.classList.add('visually-hidden');
    if (targetEl.classList.contains(targetId)) {
      hasThisElement = true;
      targetEl.classList.remove('visually-hidden');
    }
  }
}
