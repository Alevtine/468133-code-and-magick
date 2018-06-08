'use strict';

var WIZARDS_QUANTITY = 5;
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var setupBlock = document.querySelector('.setup');
var similarWizardsBlock = document.querySelector('.setup-similar');
var similarWizardsList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var removeHidden = function (elem) {
  elem.classList.remove('hidden');
};

removeHidden(setupBlock);

var getRandomValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};


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

removeHidden(similarWizardsBlock);
