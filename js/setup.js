'use strict';
(function () {

  var setupBlock = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  var usernameInput = document.querySelector('.setup-user-name');

  var dropArea = document.querySelector('.setup-artifacts');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var shopCells = dropArea.querySelectorAll('.setup-artifacts-cell');
  var draggedItem = null;

  var styleTune = function () {
    usernameInput.style.marginLeft = '125px';
    usernameInput.style.width = '505px';
  };

  var openPopup = function () {
    setupBlock.classList.remove('hidden');
    styleTune();
    document.addEventListener('keydown', onEscCloseSetupBlock);
  };

  var closePopup = function () {
    setupBlock.style.left = '';
    setupBlock.style.top = '';
    setupBlock.classList.add('hidden');
    shopCells.forEach(function (item) {
      if (item.querySelector('img')) {
        item.querySelector('img').remove();
      }
    });
    setupOpen.removeEventListener('keydown', onEscCloseSetupBlock);
  };

  var onEscCloseSetupBlock = function (evt) {
    if (usernameInput !== document.activeElement) {
      window.utils.isEscPress(evt, closePopup);
    }
  };

  var preventDefaults = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();
  };

  setupOpen.addEventListener('click', function () {
    openPopup(setupBlock);
  });

  setupClose.addEventListener('click', function () {
    closePopup(setupBlock);
  });


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


  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, preventDefaults);
  })

  ;['dragenter', 'dragover'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, function (evt) {
      dropArea.style.border = '3px dashed white';
      evt.target.style.backgroundColor = 'blue';
    });
  })

  ;['dragleave', 'drop', 'dragend'].forEach(function (eventName) {
    dropArea.addEventListener(eventName, function (evt) {
      dropArea.style.border = '';
      evt.target.style.backgroundColor = '';
    });
  });

  shopElement.addEventListener('dragenter', function (evt) {
    var target = evt.target;
    if (target.tagName.toLowerCase() === 'img') {
      draggedItem = target;
      evt.dataTransfer.setData('text/plain', target.alt);
    }
  });

  dropArea.addEventListener('drop', function (evt) {
    var clonedDraggedItem = draggedItem.cloneNode(true);
    if (evt.target.tagName.toLowerCase() !== 'img' && evt.target.hasChildNodes() === false) {
      clonedDraggedItem.setAttribute('draggable', 'false');
      evt.target.appendChild(clonedDraggedItem);
    }
  });

})();
