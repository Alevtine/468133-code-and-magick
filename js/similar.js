'use strict';

(function () {
  var WIZARDS_QUANTITY = 5;
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var userWizard = document.querySelector('.setup-wizard-wrap');
  var userWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var userWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  var similarWizardsBlock = document.querySelector('.setup-similar');
  var similarWizardsList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  var similarWizards = [];
  var eyesColor;
  var coatColor;

  var changeElementColor = function (elem, source, property) {
    elem.style[property] = window.utils.getRandomValue(source);
  };

  var onSuccess = function (data) {
    similarWizards = data;
    similarWizardsBlock.classList.remove('hidden');
    updateWizards();
  };

  var onError = function (errorMessage) {
    window.utils.onError(errorMessage);
  };

  var getRate = function (wizard) {
    var rate = 0;
    if (wizard.colorCoat === coatColor) {
      rate += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rate += 1;
    }
    return rate;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    renderAll(similarWizards.sort(function (a, b) {
      var rateDiff = getRate(b) - getRate(a);
      if (rateDiff === 0) {
        rateDiff = namesComparator(a.name, b.name);
      }
      return rateDiff;
    }));
  };


  var renderOne = function (item) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = item.name;
    wizardElement.querySelector('.wizard-coat').style.fill = item.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = item.colorEyes;
    similarWizardsList.appendChild(wizardElement);

    var artifactsFragment = document.createDocumentFragment();
    var wizardArtifacts = document.createElement('ul');
    wizardArtifacts.classList.add('bag', 'hidden');

    item.artifacts.forEach(function (it, i) {
      var artifactInfo = document.createElement('li');
      artifactInfo.textContent = (i + 1) + '.' + it.name;
      wizardArtifacts.appendChild(artifactInfo);
      artifactsFragment.appendChild(wizardArtifacts);
    });
    wizardElement.appendChild(artifactsFragment);

    wizardElement.addEventListener('mouseenter', function () {
      wizardArtifacts.classList.remove('hidden');
    });

    wizardElement.addEventListener('mouseleave', function () {
      wizardArtifacts.classList.add('hidden');
    });

  };


  var renderAll = function (arr) {
    var oldWizards = similarWizardsList.querySelectorAll('.setup-similar-item');
    window.utils.removeNodes(oldWizards);
    arr.slice(0, WIZARDS_QUANTITY).forEach(function (item) {
      renderOne(item);
    });
    return arr;
  };

  var onUserWizard = function (evt) {
    var newColor;
    switch (evt.target) {
      case userWizardCoat:
        changeElementColor(userWizardCoat, COAT_COLORS, 'fill');
        document.querySelector('input[name="coat-color"]').value = userWizardCoat.style.fill;
        newColor = userWizardCoat.style.fill;
        coatColor = newColor;
        updateWizards();
        break;
      case userWizardEyes:
        changeElementColor(userWizardEyes, EYES_COLORS, 'fill');
        document.querySelector('input[name="eyes-color"]').value = userWizardEyes.style.fill;
        newColor = userWizardEyes.style.fill;
        eyesColor = newColor;
        updateWizards();
        break;
    }
  };

  fireball.addEventListener('click', function () {
    changeElementColor(fireball, FIREBALL_COLORS, 'background');
    document.querySelector('input[name="fireball-color"]').value = fireball.style.background;
  });

  userWizard.addEventListener('click', window.utils.debounce(onUserWizard));
  window.backend.load(onSuccess, onError);


  // если загруж jsonp
  // var CALLBACK_NAME = 'jsonpCallback';
  // window[CALLBACK_NAME] = function(data) {
  //   onSuccess(data);
  // }

})();
