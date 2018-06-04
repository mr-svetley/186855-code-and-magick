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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = CLOUD_TEXT_COLOR;
  ctx.font = CLOUD_FONT;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура! Вы победили!', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_PADDING, CLOUD_Y + CLOUD_PADDING + CLOUD_LINE_HEIGHT);
  var maxTime = Math.max.apply(null, times);
  var barCurrenHeight;
  var DIAGRAM_X = CLOUD_X + CLOUD_PADDING + CLOUD_BAR_MARGIN / 2;
  var DIAGRAM_Y = CLOUD_Y + CLOUD_HEIGHT - CLOUD_PADDING;
  var DIAGRAM_COL_WIDTH = CLOUD_BAR_MARGIN + CLOUD_BAR_WIDTH;

  names.forEach(function (name, i) {
    barCurrenHeight = CLOUD_BAR_HEIGHT * times[i] / maxTime;
    var barCurrentX = DIAGRAM_X + DIAGRAM_COL_WIDTH * i;
    var barCurrentY = DIAGRAM_Y - CLOUD_LINE_HEIGHT - CLOUD_GAP - barCurrenHeight;

    ctx.fillStyle = CLOUD_TEXT_COLOR;
    ctx.fillText(name, barCurrentX, DIAGRAM_Y - CLOUD_LINE_HEIGHT);

    ctx.fillText(Math.round(times[i]), barCurrentX, barCurrentY - CLOUD_LINE_HEIGHT);

    if (name === 'Вы') {
      ctx.fillStyle = CLOUD_YOUR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }

    ctx.fillRect(barCurrentX, barCurrentY, CLOUD_BAR_WIDTH, barCurrenHeight);
  });
};
