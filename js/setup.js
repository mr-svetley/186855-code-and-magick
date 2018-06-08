'use strict';

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

  var players = [];

  players = Array.from({length: 4}, function () {
    var firsName = FIRST_NAMES[getRandomIndex(FIRST_NAMES.length)];
    var secondName = SECOND_NAMES[getRandomIndex(SECOND_NAMES.length)];
    var player = {};
    player.name = firsName + ' ' + secondName;
    player.coatColor = COAT_COLORS[getRandomIndex(COAT_COLORS.length)];
    player.eyesColor = EYES_COLORS[getRandomIndex(EYES_COLORS.length)];
    return player;
  });

  return players;
};

var renderPlayers = function (players) {
  var setupElement = document.querySelector('.setup');
  setupElement.classList.remove('hidden');
  var playerTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var playersList = setupElement.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  players.forEach(function (player) {
    var playerElement = playerTemplate.cloneNode(true);
    playerElement.querySelector('.setup-similar-label').textContent = player.name;
    playerElement.querySelector('.wizard-coat').style.fill = player.coatColor;
    playerElement.querySelector('.wizard-eyes').style.fill = player.eyesColor;
    fragment.appendChild(playerElement);
  });

  playersList.appendChild(fragment);
  setupElement.querySelector('.setup-similar').classList.remove('hidden');
};

var playersData = generatePlayers();
renderPlayers(playersData);
