'use strict';

var GIST_HEIGHT = 150;
var GIST_WIDTH = 40;
var GIST_GAP = 50;
var GIST_PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
var CLOUD_X = 100;
var CLOUD_Y = 10;

var getMaxElement = function (arr) {
  var maxEl = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxEl) {
      maxEl = arr[i];
    }
  }
  return maxEl;
};

var renderShadow = function (ctx, color) {
  ctx.beginPath();
  ctx.moveTo(140, 90);
  ctx.quadraticCurveTo(130, 20, 210, 40);
  ctx.quadraticCurveTo(260, -10, 310, 40);
  ctx.quadraticCurveTo(360, -10, 410, 40);
  ctx.quadraticCurveTo(510, -10, 500, 90);
  ctx.quadraticCurveTo(610, 90, 540, 190);
  ctx.quadraticCurveTo(580, 250, 510, 250);
  ctx.quadraticCurveTo(460, 310, 410, 270);
  ctx.quadraticCurveTo(360, 310, 310, 270);
  ctx.quadraticCurveTo(260, 310, 210, 270);
  ctx.quadraticCurveTo(130, 290, 150, 210);
  ctx.quadraticCurveTo(60, 140, 140, 90);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
};

var renderCloud = function (ctx, color) {
  ctx.beginPath();
  ctx.moveTo(130, 100);
  ctx.quadraticCurveTo(120, 30, 200, 50);
  ctx.quadraticCurveTo(250, 0, 300, 50);
  ctx.quadraticCurveTo(350, 0, 400, 50);
  ctx.quadraticCurveTo(500, 0, 490, 100);
  ctx.quadraticCurveTo(600, 100, 530, 200);
  ctx.quadraticCurveTo(570, 260, 500, 260);
  ctx.quadraticCurveTo(450, 320, 400, 280);
  ctx.quadraticCurveTo(350, 320, 300, 280);
  ctx.quadraticCurveTo(250, 320, 200, 280);
  ctx.quadraticCurveTo(120, 300, 140, 220);
  ctx.quadraticCurveTo(50, 150, 130, 100);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 240, 55);
  ctx.fillText('Список результатов: ', 240, 70);
};

window.renderStatistics = function (ctx, names, times) {
  renderShadow(ctx, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 'white');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = GIST_PLAYER_COLOR;
    } else {
      ctx.fillStyle = 'hsl(255, ' + (Math.random() * 100 + '%') + ', 50%)';
    }

    ctx.fillRect(CLOUD_X + GIST_GAP + (GIST_GAP + GIST_WIDTH) * i,
        CLOUD_X + GIST_HEIGHT - GIST_HEIGHT * times[i] / maxTime,
        GIST_WIDTH,
        GIST_HEIGHT * times[i] / maxTime);

    ctx.fillStyle = 'black';
    ctx.fillText(names[i],
        CLOUD_X + GIST_GAP + (GIST_GAP + GIST_WIDTH) * i,
        CLOUD_Y * 3 + GIST_HEIGHT + GIST_HEIGHT / 2);
    ctx.fillText(Math.floor(times[i]),
        CLOUD_X + GIST_GAP + (GIST_GAP + GIST_WIDTH) * i,
        CLOUD_X + GIST_HEIGHT - GIST_HEIGHT * times[i] / maxTime - CLOUD_Y * 1.5);
  }
};
