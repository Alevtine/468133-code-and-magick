'use strict';

var userDialog = document.querySelector('.setup-user-pic');
var setupBlock = document.querySelector('.setup');

userDialog.setAttribute('style', 'z-index: 1');

var onUserDialogMousedown = function (evt) {
  evt.preventDefault();
  window.beginCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
  document.addEventListener('mousemove', onUserDialogMousemove);
  document.addEventListener('mouseup', onUserDialogMouseup);
};

var onUserDialogMousemove = function (evt) {
  evt.preventDefault();
  var shift = {
    x: window.beginCoords.x - evt.clientX,
    y: window.beginCoords.y - evt.clientY
  };

  window.beginCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  setupBlock.style.left = (setupBlock.offsetLeft - shift.x) + 'px';
  setupBlock.style.top = (setupBlock.offsetTop - shift.y) + 'px';

};

var onUserDialogMouseup = function (evt) {
  evt.preventDefault();
  document.removeEventListener('mousemove', onUserDialogMousemove);
  document.removeEventListener('mouseup', onUserDialogMouseup);
};

userDialog.addEventListener('mousedown', onUserDialogMousedown);
