'use strict';
(function () {
  var goodsInBasket = [];
  window.basket = {
    buyGood: function (evt, obj) {
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
  };

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

  function findObjectByIndex(data, property, value) {
    for (var i = 0, l = data.length; i < l; i++) {
      if (data[i][property] === value) {
        return i;
      }
    }
    return -1;
  }

  /* ***************
   BASKET
  ****************/

  var cardsInBasket = document.querySelector('.goods__cards');
  var basketCardTemplate = document.querySelector('#card-order')
    .content
    .querySelector('.goods_card');
  var changingInBasket = false;

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
    window.goods[findObjectByIndex(window.goods, 'name', obj.name)].amount = obj.orderedAmount;
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
})();
