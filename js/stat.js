'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_TEXT_COLOR = '#000';
var CLOUD_FONT = '16px PT Mono';
var CLOUD_PADDING = 15;
var CLOUD_LINE_HEIGHT = 18;
var CLOUD_BAR_WIDTH = 40;
var CLOUD_BAR_MARGIN = 50;
var CLOUD_BAR_HEIGHT = 150;
var CLOUD_YOUR_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, width, height) {
  ctx.fillStyle = CLOUD_SHADOW_COLOR;
  ctx.fillRect(x + CLOUD_GAP, y + CLOUD_GAP, width, height);
  ctx.fillStyle = CLOUD_COLOR;
  ctx.fillRect(x, y, width, height);
};

var getMaxValue = function (arr) {
  var maxValue = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
    }
  }

  return maxValue;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_TEXT_COLOR;
  ctx.font = CLOUD_FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура! Вы победили!', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING + CLOUD_LINE_HEIGHT);
  var maxTime = getMaxValue(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = CLOUD_TEXT_COLOR;
    ctx.fillText(names[i], CLOUD_X + CLOUD_PADDING + CLOUD_BAR_MARGIN / 2 + (CLOUD_BAR_MARGIN + CLOUD_BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - CLOUD_LINE_HEIGHT - CLOUD_PADDING);

    ctx.fillText(Math.round(times[i]), CLOUD_X + CLOUD_PADDING + CLOUD_BAR_MARGIN / 2 + (CLOUD_BAR_MARGIN + CLOUD_BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * CLOUD_LINE_HEIGHT - CLOUD_GAP - CLOUD_PADDING - CLOUD_BAR_HEIGHT * times[i] / maxTime);

    if (names[i] === 'Вы') {
      ctx.fillStyle = CLOUD_YOUR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(CLOUD_X + CLOUD_PADDING + CLOUD_BAR_MARGIN / 2 + (CLOUD_BAR_MARGIN + CLOUD_BAR_WIDTH) * i, CLOUD_Y + CLOUD_HEIGHT - CLOUD_LINE_HEIGHT - CLOUD_GAP - CLOUD_PADDING - CLOUD_BAR_HEIGHT * times[i] / maxTime, CLOUD_BAR_WIDTH, CLOUD_BAR_HEIGHT * times[i] / maxTime);
  }
};
