'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var getRandomIndex = function (arrLength) {
  var maxIndex = arrLength - 1;
  return Math.round(Math.random() * maxIndex);
};

var generatePlayers = function () {
  var FIRST_NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var SECOND_NAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var players = Array.from({length: 4}, function () {
    var firsName = FIRST_NAMES[getRandomIndex(FIRST_NAMES.length)];
    var secondName = SECOND_NAMES[getRandomIndex(SECOND_NAMES.length)];

    return {
      name: firsName + ' ' + secondName,
      coatColor: COAT_COLORS[getRandomIndex(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[getRandomIndex(EYES_COLORS.length)]
    };
  });

  return players;
};

var makePlayers = function (players) {
  var playerTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var fragment = document.createDocumentFragment();

  players.forEach(function (player) {
    var playerElement = playerTemplate.cloneNode(true);
    playerElement.querySelector('.setup-similar-label').textContent = player.name;
    playerElement.querySelector('.wizard-coat').style.fill = player.coatColor;
    playerElement.querySelector('.wizard-eyes').style.fill = player.eyesColor;
    fragment.appendChild(playerElement);
  });

  return fragment;
};

var onSetupEscPress = function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetup();
  }
};

var openSetup = function () {
  setupElement.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
};

var closeSetup = function () {
  setupElement.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
};

var changeWizardBall = function () {
  var newColor = FIREBALL_COLORS[getRandomIndex(FIREBALL_COLORS.length)];
  setupFireBallElement.style.backgroundColor = newColor;
  setupFireBallInputElement.value = newColor;
};

var changeWizardCoat = function () {
  var newColor = COAT_COLORS[getRandomIndex(COAT_COLORS.length)];
  setupWizardCoatElement.style.fill = newColor;
  setupWizardCoatInputElement.value = newColor;
};

var changeWizardEyes = function () {
  var newColor = EYES_COLORS[getRandomIndex(EYES_COLORS.length)];
  setupWizardEyesElement.style.fill = newColor;
  setupWizardEyesInputElement.value = newColor;
};

var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');


setupOpenElement.addEventListener('click', function () {
  openSetup();
});

setupOpenElement.addEventListener('keydown', function (evt) {
  console.log(evt);
  if (evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

setupCloseElement.addEventListener('click', function () {
  closeSetup();
});

setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
    evt.preventDefault(); // Для предотвращения отправки формы в Edge. stopPropagation - не работает.
  }
});

var setupNameImputElement = setupElement.querySelector('.setup-user-name');

setupNameImputElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
});

var setupWizardCoatElement = setupElement.querySelector('.setup-wizard .wizard-coat');
var setupWizardCoatInputElement = setupElement.querySelector('input[name="coat-color"]')

setupWizardCoatElement.addEventListener('click', function () {
  changeWizardCoat();
});

var setupWizardEyesElement = setupElement.querySelector('.setup-wizard .wizard-eyes');
var setupWizardEyesInputElement = setupElement.querySelector('input[name="eyes-color"]')

setupWizardEyesElement.addEventListener('click', function () {
  changeWizardEyes();
});

var setupFireBallElement = setupElement.querySelector('.setup-fireball-wrap');
var setupFireBallInputElement = setupElement.querySelector('input[name="fireball-color"]')

setupFireBallElement.addEventListener('click', function () {
  changeWizardBall();
});


var playersData = generatePlayers();
var playersFragment = makePlayers(playersData);

var playersList = setupElement.querySelector('.setup-similar-list');
playersList.appendChild(playersFragment);
setupElement.querySelector('.setup-similar').classList.remove('hidden');
