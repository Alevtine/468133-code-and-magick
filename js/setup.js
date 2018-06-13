'use strict';

var WIZARDS_QUANTITY = 5;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 27;
var ENTER_KEY = 13;

var setupBlock = document.querySelector('.setup');
var similarWizardsBlock = document.querySelector('.setup-similar');
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var usernameInput = document.querySelector('.setup-user-name');
var userWizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var userWizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

var changeElementColor = function (elem, source, property) {
  elem.style[property] = getRandomValue(source);
};

var openPopup = function () {
  setupBlock.classList.remove('hidden');
};

var closePopup = function () {
  setupBlock.classList.add('hidden');
};

var isEscPress = function (evt, action) {
  if (evt.keyCode === ESC_KEY) {
    action();
  }
};

var isEnterPress = function (evt, action) {
  if (evt.keyCode === ENTER_KEY) {
    action();
  }
};

var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

setupOpen.addEventListener('click', function () {
  openPopup(setupBlock);
});

setupClose.addEventListener('click', function () {
  closePopup(setupBlock);
});

setupClose.addEventListener('keydown', function (evt) {
  if (setupClose === document.activeElement) {
    isEnterPress(evt, closePopup);
  }
});

document.addEventListener('keydown', function (evt) {
  if (usernameInput !== document.activeElement) {
    isEscPress(evt, closePopup);
  }
});

document.addEventListener('keydown', function (evt) {
  if (setupOpenIcon === document.activeElement) {
    isEnterPress(evt, openPopup);
  }
});

fireball.addEventListener('click', function () {
  changeElementColor(fireball, FIREBALL_COLORS, 'background');
  document.querySelector('input[name="fireball-color"]').value = fireball.style.background;
});

userWizardCoat.addEventListener('click', function () {
  changeElementColor(userWizardCoat, COAT_COLORS, 'fill');
  document.querySelector('input[name="coat-color"]').value = userWizardCoat.style.fill;
});

userWizardEyes.addEventListener('click', function () {
  changeElementColor(userWizardEyes, EYES_COLORS, 'fill');
  document.querySelector('input[name="eyes-color"]').value = userWizardEyes.style.fill;
});

var similarWizards = [];
for (var i = 0; i < WIZARDS_QUANTITY; i++) {
  similarWizards[i] = {
    name: getRandomValue(NAMES) + ' ' + getRandomValue(SURNAMES),
    coatColor: getRandomValue(COAT_COLORS),
    eyesColor: getRandomValue(EYES_COLORS)
  };
}

similarWizards.forEach(function (item) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = item.name;
  wizardElement.querySelector('.wizard-coat').style.fill = item.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = item.eyesColor;
  similarWizardsList.appendChild(wizardElement);
});

similarWizardsBlock.classList.remove('hidden');
