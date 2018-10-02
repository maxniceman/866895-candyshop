'use strict';
(function () {
  var deliverContainer = document.querySelector('.deliver');
  var deliverToggle = deliverContainer.querySelector('.deliver__toggle');
  var submitBtn = document.querySelector('.buy__submit-btn');

  // доставка - переключение табов
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

  // отправка заказа
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
})();
