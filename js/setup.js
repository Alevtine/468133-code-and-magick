'use strict';
(function () {

  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  var usernameInput = document.querySelector('.setup-user-name');

  var openPopup = function () {
    setupBlock.classList.remove('hidden');
  };

  var closePopup = function () {
    setupBlock.style.left = '';
    setupBlock.style.top = '';
    setupBlock.classList.add('hidden');
    document.removeEventListener('keydown', onEscCloseSetupBlock);
  };

  var onEscCloseSetupBlock = function (evt) {
    if (usernameInput !== document.activeElement) {
      window.utils.isEscPress(evt, closePopup);
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup(setupBlock);
  });

  setupClose.addEventListener('click', function () {
    closePopup(setupBlock);
  });

  document.addEventListener('keydown', onEscCloseSetupBlock);

  setupClose.addEventListener('keydown', function (evt) {
    if (setupClose === document.activeElement) {
      window.utils.isEnterPress(evt, closePopup);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (setupOpenIcon === document.activeElement) {
      window.utils.isEnterPress(evt, openPopup);
    }
  });

})();
