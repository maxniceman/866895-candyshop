'use strict';
var GOODS_NAMES = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var GOODS_PICTURES = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
var GOODS_CONTENTS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
var goodsInBasket = [];

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
// find tag in parent box
function findTag(text, tag, parentArea) {
  var parent = document.querySelector(parentArea);
  var Tags = parent.getElementsByTagName(tag);
  var searchText = text;
  var found;
  for (var i = 0; i < Tags.length; i++) {
    if (Tags[i].textContent === searchText) {
      found = Tags[i];
      break;
    }
  }
  return found;
}
// find item in Array
function findInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

var goods = createGoodsArray(6);

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

  cardItem.querySelector('.card__price').innerHTML = good.price + ' <span class="card__currency">₽</span><span class="card__weight">/ ' + good.weight + ' Г</span>';

  var starsRating = cardItem.querySelector('.stars__rating');
  starsRating.classList.remove('stars__rating--five');
  var ratingCls = {
    1: 'stars__rating--one',
    2: 'stars__rating--two',
    3: 'stars__rating--three',
    4: 'stars__rating--four',
    5: 'stars__rating--five',
  };
  starsRating.classList.add(ratingCls[good.rating.value]);

  cardItem.querySelector('.star__count').textContent = good.rating.number;

  var cardCharacteristic = cardItem.querySelector('.card__characteristic');
  cardCharacteristic.textContent = 'Без сахара';
  if (good.nutritionFacts.sugar) {
    cardCharacteristic.textContent = 'Содержит сахар';
  }
  cardItem.querySelector('.card__composition-list').textContent = good.nutritionFacts.contents;

  // add to favorite button
  var btnFavorite = cardItem.querySelector('.card__btn-favorite');
  btnFavorite.addEventListener('click', function (evt) {
    addToFavorite(evt);
  });

  // buy btn
  var btnBuy = cardItem.querySelector('.card__btn');
  btnBuy.addEventListener('click', function (evt) {
    buyGood(evt, good);
  });
  return cardItem;
};

function addToFavorite(evt) {
  evt.preventDefault();
  var target = evt.target;
  target.classList.toggle('card__btn-favorite--selected');
}

var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.catalog__card');

// DOM manipulation for catalog cards
var catalogCards = document.querySelector('.catalog__cards');
catalogCards.classList.remove('catalog__cards--load');
catalogCards.appendChild(fillTemplate(goods));
// hide loading data message
catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');

// fill template
function fillTemplate(goodsArray) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < goodsArray.length; i++) {
    fragment.appendChild(renderGoods(goodsArray[i]));
  }
  return fragment;
}

/* ***************
 BASKET
****************/

var cardsInBasket = document.querySelector('.goods__cards');
var basketCardTemplate = document.querySelector('#card-order')
  .content
  .querySelector('.goods_card');
var changingInBasket = false;

function buyGood(evt, obj) {
  evt.preventDefault();
  if (obj.amount > 0) {

    var target = evt.target;
    var parent = target.closest('.catalog__card');

    var copyOfGood = Object.assign({}, obj, {orderedAmount: 1});
    delete copyOfGood.amount;
    delete copyOfGood.nutritionFacts;
    delete copyOfGood.rating;
    delete copyOfGood.weight;
    obj.amount -= 1;
    if (obj.amount === 0) {
      parent.classList.add('card--soon');
    }

    if (goodsInBasket.length > 0) {
      var result;
      result = goodsInBasket.filter(function (elem) {
        return elem.name === copyOfGood.name;
      });

      if (result.length > 0) {
        addOneMore(result);
        updateHeaderBasketInfo();
      } else {
        goodsInBasket.push(copyOfGood);
        addToBasket(goodsInBasket);
      }
    } else {
      goodsInBasket.push(copyOfGood);
      addToBasket(goodsInBasket);
    }
  }
}

function findObjectByIndex(data, property, value) {
  for (var i = 0, l = data.length; i < l; i++) {
    if (data[i][property] === value) {
      return i;
    }
  }
  return -1;
}

function addOneMore(elem) {
  goodsInBasket[findObjectByIndex(goodsInBasket, 'name', elem[0].name)].orderedAmount += 1;
  var titleTag = findTag(elem[0].name, 'h3', '.goods__cards');
  var parent = titleTag.closest('.goods_card');
  var input = parent.querySelector('.card-order__count');
  input.value = elem[0].orderedAmount;
}

var renderBasketGoods = function (good) {
  var cardBasketItem = basketCardTemplate.cloneNode(true);
  cardBasketItem.querySelector('.card-order__title').textContent = good.name;
  cardBasketItem.querySelector('.card-order__img').src = good.picture;
  cardBasketItem.querySelector('.card-order__price').innerHTML = good.price + ' <span class="card__currency">₽</span>';
  cardBasketItem.querySelector('.card-order__count').value = 1;
  cardBasketItem.querySelector('.card-order__close').addEventListener('click', function (evt) {
    deleteFromBasket(evt, good);
  });
  // TODO increase items by arrown
  cardBasketItem.querySelector('.card-order__btn--increase').addEventListener('click', function (evt) {
    increaseItem(evt, good);
  });
  // TODO decrease items by arrown
  cardBasketItem.querySelector('.card-order__btn--decrease').addEventListener('click', function (evt) {
    decreaseItem(evt, good);
  });
  return cardBasketItem;
};

function deleteFromBasket(evt, elem) {
  evt.preventDefault();
  var target = evt.target;
  var parent = target.parentNode;
  parent.remove();
  returnAmountToGood(elem);
  goodsInBasket.splice(findInArray(goodsInBasket, elem), 1);
  updateHeaderBasketInfo();
  if (cardsInBasket.querySelectorAll('.goods_card').length === 0) {
    changingInBasket = false;
    showHideDefaultBasketText();
    updateHeaderBasketInfo();
  }
}

function returnAmountToGood(obj) {
  goods[findObjectByIndex(goods, 'name', obj.name)].amount = obj.orderedAmount;
  var titleTag = findTag(obj.name, 'h3', '.catalog__cards');
  titleTag.closest('.catalog__card').classList.remove('card--soon');
}

function addToBasket() {
  cardsInBasket.appendChild(fillBasketTemplate(goodsInBasket));
  changingInBasket = true;
  updateHeaderBasketInfo();
  if (cardsInBasket.querySelectorAll('.goods_card').length === 1) {
    showHideDefaultBasketText();
  }
}
// TODO increase
function increaseItem(evt, elem) {
  var target = evt.target;
  var parent = target.parentNode;
  var input = parent.querySelector('.card-order__count');
  input.value = parseInt(input.value, 10) + 1;
  elem.orderedAmount += 1;
}
// TODO decrease
function decreaseItem(evt, elem) {
  var target = evt.target;
  var parent = target.parentNode;
  var input = parent.querySelector('.card-order__count');
  if (parseInt(input.value, 10) === 1) {
    return;
  } else {
    input.value = parseInt(input.value, 10) - 1;
    elem.orderedAmount -= 1;
  }
}

function showHideDefaultBasketText() {
  cardsInBasket.classList.toggle('goods__cards--empty');
  cardsInBasket.querySelector('.goods__card-empty').classList.toggle('visually-hidden');
}

function fillBasketTemplate(elements) {
  var fragment = document.createDocumentFragment();
  return fragment.appendChild(renderBasketGoods(elements[elements.length - 1]));
}


/* ****************
 BASKET IN HEADER
 *****************/
var headerBasket = document.querySelector('.main-header__basket');
var defaultInfo = headerBasket.textContent;

function updateHeaderBasketInfo() {

  if (changingInBasket) {
    var allGoods = 0;
    for (var i = 0; i < goodsInBasket.length; i++) {
      allGoods += goodsInBasket[i].orderedAmount;
    }
    switch (allGoods) {
      case 1:
        headerBasket.textContent = 'В корзине ' + allGoods + ' товар';
        break;
      case 2:
        headerBasket.textContent = 'В корзине ' + allGoods + ' товара';
        break;
      case 3:
        headerBasket.textContent = 'В корзине ' + allGoods + ' товара';
        break;
      case 4:
        headerBasket.textContent = 'В корзине ' + allGoods + ' товара';
        break;
      default:
        headerBasket.textContent = 'В корзине ' + allGoods + ' товаров';
    }
  } else {
    headerBasket.textContent = defaultInfo;
  }
}


/* ***************
 DELIVERY
 ****************/
var deliverContainer = document.querySelector('.deliver');
var deliverToggle = deliverContainer.querySelector('.deliver__toggle');
deliverToggle.addEventListener('click', function (evt) {
  changeTabs(evt, '.deliver > div');
});

function changeTabs(evt, nodes) {
  var target = evt.target;
  if (target.tagName !== 'INPUT') {
    return;
  }
  var targetId = target.id;
  var targets = deliverContainer.querySelectorAll(nodes);
  for (var i = 0; i < targets.length; i++) {
    var targetEl = targets[i];
    targetEl.classList.add('visually-hidden');

    if (targetEl.classList.contains(targetId)) {
      targetEl.classList.remove('visually-hidden');
      disableEnableFormElements(targetEl);
    } else {
      disableEnableFormElements(targetEl);
    }
  }
}

/* ***************
 RANGE SLIDER
 ****************/
var minGoodPrice = 0;
var maxGoodPrice = 1000;
var rangeFilter = document.querySelector('.range__filter');
var rangeLine = document.querySelector('.range__fill-line');
var leftRangePrice = document.querySelector('.range__btn--left');
var rightRangePrice = document.querySelector('.range__btn--right');
var rangePriceMinValue = document.querySelector('.range__price--min');
var rangePriceMaxValue = document.querySelector('.range__price--max');
var leftBorder = rangeFilter.offsetLeft + leftRangePrice.offsetWidth / 2;
var rightBorder = rangeFilter.offsetLeft + rangeFilter.offsetWidth - rightRangePrice.offsetWidth / 2;
var direction = '';
var oldx = 0;
setDefaultValueSlider(minGoodPrice, maxGoodPrice);
function setDefaultValueSlider(minValue, maxValue) {
  leftRangePrice.style.left = 0;
  rightRangePrice.style.right = 0;
  rangeLine.style.left = 0;
  rangeLine.style.right = 0;
  rangePriceMinValue.textContent = minValue;
  rangePriceMaxValue.textContent = maxValue;


  leftRangePrice.style.zIndex = 10;
}

leftRangePrice.addEventListener('mousedown', function (evt) {
  var target = evt.target;
  var startCoords = {
    x: evt.clientX
  };
  var onMouseMove = function (moveEvt) {
    moveSide(moveEvt);
    var shift = {
      x: startCoords.x - moveEvt.clientX
    };
    startCoords = {
      x: moveEvt.clientX
    };
    if (startCoords.x > leftBorder) {
      var position = target.offsetLeft - shift.x;
      if (target.offsetLeft < rightRangePrice.offsetLeft || direction === 'left') {
        target.style.left = position + 'px';
        setMinMaxRange(rangePriceMinValue, position);
        colorRangeLeftPoint(position);
      }
    } else {
      setMinMaxRange(rangePriceMinValue, minGoodPrice);
    }
  };
  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

rightRangePrice.addEventListener('mousedown', function (evt) {
  var target = evt.target;
  var startCoords = {
    x: evt.clientX
  };
  var onMouseMove = function (moveEvt) {
    moveSide(moveEvt);
    var shift = {
      x: startCoords.x - moveEvt.clientX
    };
    startCoords = {
      x: moveEvt.clientX
    };
    if (startCoords.x < rightBorder) {
      var position = target.offsetLeft - shift.x;
      if (target.offsetLeft > leftRangePrice.offsetLeft || direction === 'right') {
        target.style.left = position + 'px';
        setMinMaxRange(rangePriceMaxValue, position);
        colorRangeRightPoint(position);
      }
    } else {
      setMinMaxRange(rangePriceMaxValue, rangeFilter.offsetWidth);
    }
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

function moveSide(evt) {
  if (evt.pageX < oldx) {
    direction = 'left';
  } else if (evt.pageX > oldx) {
    direction = 'right';
  }
  oldx = evt.pageX;
}

function setMinMaxRange(displayElem, value) {
  var text = Math.round(value * maxGoodPrice / rangeFilter.offsetWidth);
  displayElem.textContent = text;
}
function colorRangeLeftPoint(value) {
  rangeLine.style.left = value + 'px';
}
function colorRangeRightPoint(value) {
  rangeLine.style.right = rangeFilter.offsetWidth - value + 'px';
}

/* ***************
 FORM VALIDATION
 ****************/

var submitBtn = document.querySelector('.buy__submit-btn');
submitBtn.addEventListener('click', function () {
  checkCardNumber();
});

function checkCardNumber() {
  var cardNumberInput = document.querySelector('#payment__card-number');
  var numbers = cardNumberInput.value;
  var numbersArray = numbers.split('').map(function (x) {
    return parseInt(x, 10);
  });
  var finalSum = 0;

  for (var i = 0; i < numbersArray.length; i++) {
    var item = numbersArray[i];
    if (i % 2 === 0) {
      var intermediateValue = item * 2;
      if (intermediateValue >= 9) {
        intermediateValue -= 9;
      }
      numbersArray[i] = intermediateValue;
    }
  }

  for (var j = 0; j < numbersArray.length; j++) {
    finalSum += numbersArray[j];
  }

  if (finalSum % 10 !== 0) {
    cardNumberInput.setCustomValidity('Пожалуйста введите правильный номер карты');
    return false;
  } else {
    cardNumberInput.setCustomValidity('');
    return true;
  }
}

function disableEnableFormElements(elt) {
  var elements = elt.querySelectorAll('input');
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].disabled) {
      elements[i].disabled = false;
    } else {
      elements[i].disabled = true;
    }
  }
}
var deliverCourierBox = document.querySelector('.deliver__courier');
disableEnableFormElements(deliverCourierBox);
