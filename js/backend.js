'use strict';
(function () {
  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var URL_POST = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 5000;

  var request = function (onSuccess, onError, url, method, data) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        default:
          onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onSuccess, onError) {
      request(onSuccess, onError, URL_GET, 'GET');
    },

    send: function (data, onSuccess, onError) {
      request(onSuccess, onError, URL_POST, 'POST', data);
    }
  };

})();
