'use strict';

(function () {

  var ESC_KEY = 27;
  var ENTER_KEY = 13;
  var ERRBLOCK_DELAY = 5000;
  var DEBOUNCE_INTERVAL = 500;

  window.utils = {

    removeNodes: function (elem) {
      elem.forEach(function (item) {
        item.remove();
      });
    },

    getRandomValue: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    isEscPress: function (evt, action) {
      if (evt.keyCode === ESC_KEY) {
        action();
      }
    },

    isEnterPress: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },

    onError: function (errorMessage) {
      var errorBlock = document.createElement('div');
      document.body.insertBefore(errorBlock, document.body.firstChild);
      errorBlock.textContent = errorMessage;
      errorBlock.style.textAlign = 'center';
      errorBlock.style.fontSize = '30px';
      errorBlock.style.color = 'white';
      errorBlock.style.backgroundColor = 'gray';
      setTimeout(function () {
        errorBlock.remove();
      }, ERRBLOCK_DELAY);
    },

    slide: function (elem, handler) {
      var onMousedown = function (evt) {
        evt.preventDefault();
        var beginCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var onMousemove = function (evtMove) {
          evtMove.preventDefault();
          var shift = {
            x: beginCoords.x - evtMove.clientX,
            y: beginCoords.y - evtMove.clientY
          };
          beginCoords = {
            x: evtMove.clientX,
            y: evtMove.clientY
          };
          elem.style.left = (elem.offsetLeft - shift.x) + 'px';
          elem.style.top = (elem.offsetTop - shift.y) + 'px';
        };

        var onMouseup = function (evtUp) {
          evtUp.preventDefault();
          document.removeEventListener('mousemove', onMousemove);
          document.removeEventListener('mouseup', onMouseup);
        };
        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('mouseup', onMouseup);
      };
      handler.addEventListener('mousedown', onMousedown);
    },

    debounce: function (fun) {
      var lastTimeout = null;
      return function () {
        var args = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          fun.apply(null, args);
        }, DEBOUNCE_INTERVAL);
      };
    }

  };


})();
