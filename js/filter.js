'use strict';
(function () {


  //TODO заполнение счетчиков по сотаву
  //TODO фильтрация по сотаву


  var catalogCards = document.querySelector('.catalog__cards');



  var sideBar = document.querySelector('.catalog__sidebar');
  var sideBarForm = sideBar.querySelector('form');
  var filtersCounters = sideBar.querySelectorAll('.input-btn__item-count');
  var rangeCounter = sideBar.querySelector('.range__count');

  var minGoodPrice = 0;
  var maxGoodPrice = 100;
  var rangeFilter = document.querySelector('.range__filter');
  var rangeLine = document.querySelector('.range__fill-line');
  var leftRangePrice = document.querySelector('.range__btn--left');
  var rightRangePrice = document.querySelector('.range__btn--right');
  var rangePriceMinValue = document.querySelector('.range__price--min');
  var rangePriceMaxValue = document.querySelector('.range__price--max');
  var leftBorder = rangeFilter.offsetLeft + leftRangePrice.offsetWidth / 2;
  var rightBorder = rangeFilter.offsetLeft + rangeFilter.offsetWidth - rightRangePrice.offsetWidth / 2;


  window.filter = {
    fillFilterSection: function(element) {
      var labels = document.querySelectorAll('ul.catalog__filter label');
      for (var i=0; i<labels.length; i++) {
        if (element.kind === labels[i].textContent) {
          var r = /\d+/;
          var nextEl = labels[i].nextElementSibling;
          var number = nextEl.textContent.match(r);
          number ++;
          nextEl.textContent = '(' + number + ')';
        }
        if (labels[i].textContent === 'Без сахара' && element.nutritionFacts.sugar === false) {
          var r = /\d+/;
          var nextEl = labels[i].nextElementSibling;
          var number = nextEl.textContent.match(r);
          number ++;
          nextEl.textContent = '(' + number + ')';
        }
        if (labels[i].textContent === 'Вегетарианское' && element.nutritionFacts.vegetarian) {
          var r = /\d+/;
          var nextEl = labels[i].nextElementSibling;
          var number = nextEl.textContent.match(r);
          number ++;
          nextEl.textContent = '(' + number + ')';
        }
        if (labels[i].textContent === 'Безглютеновое' && element.nutritionFacts.gluten === false) {
          var r = /\d+/;
          var nextEl = labels[i].nextElementSibling;
          var number = nextEl.textContent.match(r);
          number ++;
          nextEl.textContent = '(' + number + ')';
        }
      }
      rangeCounter.textContent = '(' + (window.goods.length+1) + ')';
    },
    countFavoritedGoods: function (evt) {
      var r = /\d+/;
      var target = evt.target;
      var favoriteInput = sideBar.querySelector('#filter-favorite');
      var parent = favoriteInput.parentNode;
      var counterElement = parent.querySelector('span');
      var number = counterElement.textContent.match(r);
      if (target.classList.contains('card__btn-favorite--selected')) {
        number ++;
      } else {
        number --;
      }
      counterElement.textContent = '(' + number + ')';
    },
    fillInStockGoods: function (elem) {
      var r = /\d+/;
      var parentAvailabilityInput = sideBar.querySelector('#filter-availability').parentNode;
      var counterElement = parentAvailabilityInput.querySelector('span');
      var number = counterElement.textContent.match(r);
      if (elem.amount > 0) {
        number ++;
      }
      counterElement.textContent = '(' + number + ')';
    },
    countInStockGoods: function (elem) {
      var r = /\d+/;
      var parentAvailabilityInput = sideBar.querySelector('#filter-availability').parentNode;
      var counterElement = parentAvailabilityInput.querySelector('span');
      var number = counterElement.textContent.match(r);
      if (elem.amount === 0) {
        number --;
      } else {
        number ++;
      }
      counterElement.textContent = '(' + number + ')';
    }
  }

  function resetAllFilterCounters  () {
    rangeCounter.textContent = '(' + 0 + ')';
    for (var i=0; i<filtersCounters.length; i++) {
      filtersCounters[i].textContent = '(' + 0 + ')';
    }
  }


  setDefaultValueSlider(minGoodPrice, maxGoodPrice);
  resetAllFilterCounters();




  function setDefaultValueSlider(minValue, maxValue) {
    leftRangePrice.style.left = 0;
    rightRangePrice.style.left = rangeFilter.offsetWidth - rightRangePrice.offsetWidth + 'px';
    rightRangePrice.style.right = 'auto';
    rangeLine.style.left = 0;
    rangeLine.style.right = 0;
    rangePriceMinValue.textContent = minValue;
    rangePriceMaxValue.textContent = maxValue;

    // без z-index конфликт с полосой слайдера - она перекрывает левый бегунок
    leftRangePrice.style.zIndex = 10;
  }

  leftRangePrice.addEventListener('mousedown', function (evt) {
    var rightRangePriceStop = parseInt(rightRangePrice.style.left, 10);
    var target = evt.target;
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var position = target.offsetLeft - shift.x;
      if (startCoords.x > leftBorder) {
        if (startCoords.x < rightRangePriceStop + rangeFilter.offsetLeft) {
          target.style.left = position + 'px';
          setMinMaxRange(rangePriceMinValue, position);
          colorRangeLeftPoint(position);
        } else {
          target.style.left = rightRangePriceStop + 'px';
          setMinMaxRange(rangePriceMinValue, rightRangePriceStop);
          colorRangeLeftPoint(rightRangePriceStop);
        }
      } else {
        target.style.left = minGoodPrice + 'px';
        colorRangeLeftPoint(minGoodPrice);
        setMinMaxRange(rangePriceMinValue, minGoodPrice);
      }
    };
    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      showPricedGoods();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function showPricedGoods () {
    var min = parseInt(rangePriceMinValue.textContent);
    var max = parseInt(rangePriceMaxValue.textContent);
    var goods = window.goods.filter(function (good) {
      return good.price >= min && good.price <= max;
    });
    rangeCounter.textContent = '(' + goods.length + ')';
    if (goods.length > 0) {
      catalog.fillTemplate(goods);
    } else {
      showEmptyFiltersMessage();
    }
  }

  rightRangePrice.addEventListener('mousedown', function (evt) {
    var leftRangePriceStop = parseInt(leftRangePrice.style.left, 10);
    var target = evt.target;
    var startCoords = {
      x: evt.clientX
    };
    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };
      var position = target.offsetLeft - shift.x;
      if (startCoords.x < rightBorder) {
        if (startCoords.x > leftRangePriceStop + rangeFilter.offsetLeft) {
          target.style.left = position + 'px';
          setMinMaxRange(rangePriceMaxValue, position);
          colorRangeRightPoint(position);
        } else {
          target.style.left = leftRangePriceStop + 'px';
          setMinMaxRange(rangePriceMaxValue, leftRangePriceStop);
          colorRangeRightPoint(leftRangePriceStop);
        }
      } else {
        target.style.left = rangeFilter.offsetWidth - rightRangePrice.offsetWidth + 'px';
        colorRangeRightPoint(rangeFilter.offsetWidth);
        setMinMaxRange(rangePriceMaxValue, rangeFilter.offsetWidth);
      }
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      showPricedGoods();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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







  var filteredGoods = [];

  function updateFilteredArray() {
    filteredGoods = window.goods;
    console.log(filteredGoods);
  }

  // мороженое
  var iceCreamFilterBtn = document.querySelector('#filter-icecream');
  iceCreamFilterBtn.addEventListener('change', function (evt) {
    //filterByComposition(evt);
    filterProducts2(filterIceCream);
  });

  //Газировка
  var sodaFilterBtn = document.querySelector('#filter-soda');
  sodaFilterBtn.addEventListener('change', function (evt) {
    //filterByComposition(evt);
    filterProducts2(filterSoda);
  });

  //Жевательная резинка
  var gumFilterBtn = document.querySelector('#filter-gum');
  gumFilterBtn.addEventListener('change', function (evt) {
    //filterByComposition(evt);
    filterProducts2(filterGum);
  });

  //Мармелад
  var marmaladeFilterBtn = document.querySelector('#filter-marmalade');
  marmaladeFilterBtn.addEventListener('change', function (evt) {
    //filterByComposition(evt);
    filterProducts2(filterMarmalade);
  });

  //Зефир
  var marshmallowsFilterBtn = document.querySelector('#filter-marshmallows');
  marshmallowsFilterBtn.addEventListener('change', function (evt) {
    //filterByComposition(evt);
    filterProducts2(filterMarshmallows);
  });

  var filterIceCream = function (good) {return good.kind === 'Мороженое';};
  var filterSoda = function (good) {return good.kind === 'Газировка';};
  var filterGum = function (good) {return good.kind === 'Жевательная резинка';};
  var filterMarmalade = function (good) {return good.kind === 'Мармелад';};
  var filterMarshmallows = function (good) {return good.kind === 'Зефир';};


  var filterNoSugar = function (good) {return good.nutritionFacts.sugar === false;}
  var filterVegetarian = function (good) {return good.nutritionFacts.vegetarian;}
  var filterNoGluten = function (good) {return good.nutritionFacts.gluten === false;}



  var someFilters = [];
  function filterProducts(func) {
    var findedObj = window.util.findInArray(someFilters, func);
    if (findedObj < 0 || someFilters.length === 0) {
      someFilters.push(func);
    } else {
      someFilters.splice(window.util.findInArray(someFilters, func), 1);
    }
    if (filteredGoods.length > 0) {
      var filteredData = someFilters.reduce(function(d, f) {
        return d.filter(f);
      }, filteredGoods);
    } else {
      var filteredData = someFilters.reduce(function(d, f) {
        return d.filter(f);
      }, window.goods);
    }
    
    if (filteredData.length === 0) {
      showEmptyFiltersMessage();
    }else {
      console.log(someFilters);
      console.log(filteredData);
      catalog.fillTemplate(filteredData);
    }

    
  }


  function filterProducts2(func) {
    var findedObj = window.util.findInArray(someFilters, func);
    if (findedObj < 0 || someFilters.length === 0) {
      someFilters.push(func);
    } else {
      someFilters.splice(window.util.findInArray(someFilters, func), 1);
    }
    //var filteredData = window.goods.filter(func);
    // var filteredData = someFilters.reduce(function(d, f) {
    //   return d.filter(f);
    // }, window.goods);

    // var filteredData = window.goods.reduce(function(acc, current) {
    //
    //   //return acc.concat(current.filter(func));
    //   //return f.filter(d);
    // });

    var filteredData = window.goods.filter(func);
    for (var i=0; i<filteredData.length; i++) {
      if ( window.util.findInArray(filteredGoods, filteredData[i]) < 0){
        filteredGoods.push(filteredData[i]);
      } else {
        filteredGoods.splice(window.util.findInArray(filteredGoods, filteredData[i]), 1);
      }
    }
     console.log(filteredGoods);
     catalog.fillTemplate(filteredGoods);
  }




















  function filterByComposition(evt) {
    resetSortingFilters('sort');
    var target = evt.target;
    var labelText = target.nextElementSibling.textContent;
    var goodsArray = window.goods.filter(function (good) {
      return good.kind === labelText;
    });

    for (var i=0; i<goodsArray.length; i++) {
      if ( window.util.findInArray(filteredGoods, goodsArray[i]) < 0){
        filteredGoods.push(goodsArray[i]);
      } else {
        filteredGoods.splice(window.util.findInArray(filteredGoods, goodsArray[i]), 1);
      }
    }
    console.log(filteredGoods);
    if (filteredGoods.length === 0) {
      window.catalog.fillTemplate(window.goods);
    } else {
      window.catalog.fillTemplate(filteredGoods);
    }
  }


  // function filterByComposition(evt) {
  //   resetSortingFilters('sort');
  //   var target = evt.target;
  //   var labelText = target.nextElementSibling.textContent;
  //   var targetValue = evt.target.value;
  //   var paramName = targetValue.split('-')[0];
  //
  //   var goodsArray = window.goods.filter(function (good) {
  //     switch (paramName) {
  //       case 'sugar':
  //         return good.nutritionFacts.sugar === false;
  //         break
  //       case 'vegetarian':
  //         return good.nutritionFacts.vegetarian === true;
  //         break
  //       case 'gluten':
  //         return good.nutritionFacts.gluten === false;
  //         break
  //       default:
  //         return good.kind === labelText;
  //         break
  //
  //     }
  //   });
  //
  //   for (var i=0; i<goodsArray.length; i++) {
  //     if ( window.util.findInArray(filteredGoods, goodsArray[i]) < 0){
  //       filteredGoods.push(goodsArray[i]);
  //     } else {
  //       filteredGoods.splice(window.util.findInArray(filteredGoods, goodsArray[i]), 1);
  //     }
  //   }
  //   console.log(filteredGoods);
  //   if (filteredGoods.length === 0) {
  //     window.catalog.fillTemplate(window.goods);
  //   } else {
  //     window.catalog.fillTemplate(filteredGoods);
  //   }
  // }


  //Без сахара
  var sugarFreeFilterBtn = document.querySelector('#filter-sugar-free');
  sugarFreeFilterBtn.addEventListener('change', function (evt) {
    //filterByNutrition(evt);
    filterProducts(filterNoSugar);
  });

  //Вегетарианское
  var vegetarianFilterBtn = document.querySelector('#filter-vegetarian');
  vegetarianFilterBtn.addEventListener('change', function (evt) {
    //filterByNutrition(evt);
    filterProducts(filterVegetarian);
  });

  //Безглютеновое
  var glutenFreeFilterBtn = document.querySelector('#filter-gluten-free');
  glutenFreeFilterBtn.addEventListener('change', function (evt) {
    //filterByNutrition(evt);
    filterProducts(filterNoGluten);
  });

  function filterByNutrition(evt) {
    resetSortingFilters('sort');
    var targetValue = evt.target.value;
    var paramName = targetValue.split('-')[0];
    if (filteredGoods.length === 0) {
      var goodsArray = window.goods.filter(function (good) {
        switch (paramName) {
          case 'sugar':
            return good.nutritionFacts.sugar === false;
            break
          case 'vegetarian':
            return good.nutritionFacts.vegetarian;
            break
          case 'gluten':
            return good.nutritionFacts.gluten === false;
            break
        }

      });
    } else {
      var goodsArray = filteredGoods.filter(function (good) {
        switch (paramName) {
          case 'sugar':
            return good.nutritionFacts.sugar === false;
            break
          case 'vegetarian':
            return good.nutritionFacts.vegetarian;
            break
          case 'gluten':
            return good.nutritionFacts.gluten === false;
            break
        }
      });
    }

    var tempArray;
    tempArray = goodsArray;
    window.catalog.fillTemplate(tempArray);

    // for (var i=0; i<goodsArray.length; i++) {
    //   if ( window.util.findInArray(filteredGoods, goodsArray[i]) < 0){
    //     filteredGoods.push(goodsArray[i]);
    //   } else {
    //     filteredGoods.splice(window.util.findInArray(filteredGoods, goodsArray[i]), 1);
    //   }
    // }
    // console.log(goodsArray);
    // //window.catalog.fillTemplate(filteredGoods);
    // if (filteredGoods.length === 0) {
    //   window.catalog.fillTemplate(window.goods);
    // } else {
    //   window.catalog.fillTemplate(goodsArray);
    // }
  }


  function updateFilteredGoodsArray() {

  }




  // только избранное
  var favoriteFilterBtn = document.querySelector('#filter-favorite');
  favoriteFilterBtn.addEventListener('change', function (evt) {
    var goods = window.goods.filter(function (good) {
      return good.isFavorite;
    });
    if (goods.length > 0) {
      window.catalog.fillTemplate(goods);

    } else {
      showEmptyFiltersMessage();
    }
    sideBarForm.reset();
    resetSortingFilters('sort');
  });


  // в наличии
  var availabilityFilterBtn = document.querySelector('#filter-availability');
  availabilityFilterBtn.addEventListener('change', function (evt) {
    window.catalog.fillTemplate(window.goods.filter(function (good) {
      return good.amount > 0;
    }));
    sideBarForm.reset();
    resetSortingFilters('sort');
  });




  //сначала популярные
  var mostPopularFilterBtn = document.querySelector('#filter-popular');
  mostPopularFilterBtn.addEventListener('change', function (evt) {
    resetSortingFilters('food-type');
    resetSortingFilters('food-property');
    filteredGoods = [];
    window.catalog.fillTemplate(window.goods);
  });



  var sortedGoods = []
  // сначала дорогие
  var mostExpensiveFilterBtn = document.querySelector('#filter-expensive');
  mostExpensiveFilterBtn.addEventListener('change', function (evt) {
    resetSortingFilters('food-type');
    resetSortingFilters('food-property');
    filteredGoods = [];
    if (sortedGoods.length === 0) {
      sortedGoods = window.goods.slice(0);
    }
    var goodsPrices = sortedGoods.sort(compareNumbersDescending);
    window.catalog.fillTemplate(goodsPrices);
  });

  // сначала дешевые
  var mostCheapFilterBtn = document.querySelector('#filter-cheep');
  mostCheapFilterBtn.addEventListener('change', function (evt) {
    resetSortingFilters('food-type');
    resetSortingFilters('food-property');
    filteredGoods = [];
    if (sortedGoods.length === 0) {
      sortedGoods = window.goods.slice(0);
    }
    var goodsPrices = sortedGoods.sort(compareNumbersAscending);
    window.catalog.fillTemplate(goodsPrices);
  });

  // по рейтингу
  var mostRatingFilterBtn = document.querySelector('#filter-rating');
  mostRatingFilterBtn.addEventListener('change', function (evt) {
    if (sortedGoods.length === 0) {
      sortedGoods = window.goods.slice(0);
    }
    var goodsRating = sortedGoods.sort(compareRating);
    var goodsVoices = goodsRating.sort(compareVoices);
    console.log(goodsVoices);
    window.catalog.fillTemplate(goodsVoices);
  });

  // Показать всё
  sideBarForm.addEventListener('submit', function (evt) {
    sideBarForm.reset();
    window.catalog.fillTemplate(window.goods);
    filteredGoods = [];
    sortedGoods = [];
    setDefaultValueSlider(minGoodPrice, maxGoodPrice);
    evt.preventDefault();
  });

  function compareNumbersDescending(a, b) {
    if (a.price < b.price) return 1;
    if (a.price > b.price) return -1;
  }
  function compareNumbersAscending(a, b) {
    if (a.price > b.price) return 1;
    if (a.price < b.price) return -1;
  }
  function compareRating(a, b) {
    if (a.rating.value < b.rating.value) return 1;
    if (a.rating.value > b.rating.value) return -1;
    if (a.rating.value === b.rating.value) {
      compareVoices(a,b);
    }
  }
  function compareVoices(a, b) {
    if (a.rating.value === b.rating.value) {
      if (a.rating.number < b.rating.number) return 1;
      if (a.rating.number > b.rating.number) return -1;
    }
  }



  function resetSortingFilters(name) {
    var elements = sideBar.querySelectorAll('input[name=' + '\"' + name + '\"' + ']');
    for (var i=0; i<elements.length; i++) {
      elements[i].checked = false;
    }
  }

  var emptyFiltersTemplate = document.querySelector('#empty-filters')
    .content
    .querySelector('.catalog__empty-filter');
  function showEmptyFiltersMessage() {
    catalogCards.innerHTML = '';
    catalogCards.appendChild(emptyFiltersTemplate);
    console.log(emptyFiltersTemplate);
  }


})();
