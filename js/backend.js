'use strict';
(function () {
  var URL = 'https://js.dump.academy/candyshop';
  var URL_DATA = 'https://js.dump.academy/candyshop/data';
  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onSuccess(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения.');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 10000; // 10s

      xhr.open('GET', URL_DATA);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        onSuccess(xhr.response);
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка отправки данных.');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
