'use strict';

(function () {
  var userDialog = document.querySelector('.setup-user-pic');
  var setupBlock = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var uploadBlock = document.querySelector('.upload');
  var uploadInput = uploadBlock.querySelector('input');

  var styleSetup = function () {
    userDialog.style.borderRadius = '500px';
    userDialog.style.width = '100px';
    userDialog.style.height = '100px';
    userDialog.style.margin = '40px 30px';
  };

  var onSuccess = function () {
    setupBlock.classList.add('hidden');
    setupForm.reset();
  };

  uploadInput.addEventListener('change', function () {
    window.utils.fileChooser(uploadInput.files[0], userDialog);
  });

  ['dragenter', 'dragover', 'drop'].forEach(function (item) {
    userDialog.addEventListener(item, function (evt) {
      evt.preventDefault();
    });
  });

  userDialog.addEventListener('drop', function (evt) {
    window.utils.fileChooser(evt.dataTransfer.files[0], userDialog);
  });


  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(
        new FormData(setupForm),
        function () {
          onSuccess();
        },
        function (errorMessage) {
          window.utils.onError(errorMessage);
        }
    );
  });

  window.utils.slide(setupBlock, userDialog);
  styleSetup();
})();
