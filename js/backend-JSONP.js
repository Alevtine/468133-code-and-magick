'use strict';

(function () {
  var URL_GET_JSONP = 'https://js.dump.academy/code-and-magick/data';
  var CALLBACK_NAME = 'jsonpCallback';

  var loader = document.createElement('script');
  loader.src = URL_GET_JSONP + '?callback=' + CALLBACK_NAME;
  document.body.append(loader);

  loader.addEventListener('error', function () {
    window.utils.onError('Произошла ошибка соединения');
  });

})();
