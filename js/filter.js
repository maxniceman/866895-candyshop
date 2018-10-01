'use strict';
(function () {
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

  setDefaultValueSlider(minGoodPrice, maxGoodPrice);

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
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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
})();
