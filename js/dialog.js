'use strict';

(function () {
  var userDialog = document.querySelector('.setup-user-pic');
  var setupBlock = document.querySelector('.setup');
  var setupForm = document.querySelector('.setup-wizard-form');

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
