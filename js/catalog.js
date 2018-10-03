'use strict';
(function () {

  var goods = [];

  window.catalog = {
    // fill template
    fillTemplate: function (goodsArray) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < goodsArray.length; i++) {
        goods.push(goodsArray[i]);
        fragment.appendChild(renderGoods(goodsArray[i]));
      }
      catalogCards.appendChild(fragment);
    }
  };

  window.goods = goods;

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
    cardItem.querySelector('.card__img').src = 'img/cards/' + good.picture;

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
      window.basket.buyGood(evt, good);
    });
    return cardItem;
  };

  var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.catalog__card');

  // DOM manipulation for catalog cards
  var catalogCards = document.querySelector('.catalog__cards');
  catalogCards.classList.remove('catalog__cards--load');

  // hide loading data message
  catalogCards.querySelector('.catalog__load').classList.add('visually-hidden');

  function addToFavorite(evt) {
    evt.preventDefault();
    var target = evt.target;
    target.classList.toggle('card__btn-favorite--selected');
  }

})();
