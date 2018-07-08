'use strict';

var ESC_KEY = 27;
var ENTER_KEY = 13;


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
  }

};
