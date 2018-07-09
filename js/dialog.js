'use strict';

(function () {
  var setupBlock = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');
  var submitButton = document.querySelector('.setup-submit');

  userDialog.setAttribute('style', 'z-index: 1');


  var onSuccess = function () {
    setupBlock.classList.add('hidden');
    setupForm.reset();
  };

  window.utils.slide(setupBlock, userDialog);

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

})();
