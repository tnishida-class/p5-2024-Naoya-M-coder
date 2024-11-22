// 最終課題を制作しよう

let numCircles = 12; // 外周の円の数
let radius = 250;    // 外周の半径
let centerX, centerY; // 中心位置
let circleColors = []; // 配列で各円の色を管理
let angleOffset = 0;  // 回転のアニメーションオフセット
let lineAngle = 0;    // 放射線のアニメーションオフセット

function setup() {
  createCanvas(800, 800);
  centerX = width / 2;
  centerY = height / 2;
  noStroke();
  initializeColors(); // 配列にランダムな色を設定
  textAlign(CENTER, CENTER);
}

function draw() {
  background(0); // 背景を黒に設定
  drawLogo();    // ロゴを描画
}

function initializeColors() {
  for (let i = 0; i < numCircles; i++) {
    circleColors.push([random(100, 255), random(100, 255), random(100, 255)]);
  }
}

function drawLogo() {
  drawRays(); // 中央から伸びる放射線
  drawCircles(); // 外周の円を描画
  drawCenter(); // 中央の円と文字を描画
}

function drawRays() {
  push();
  translate(centerX, centerY);
  for (let i = 0; i < 24; i++) {
    let angle = TWO_PI / 24 * i + lineAngle;
    let x = cos(angle) * radius * 1.2;
    let y = sin(angle) * radius * 1.2;
    stroke(255, 204, 0, 150); // 放射線の色
    strokeWeight(2);
    line(0, 0, x, y);
  }
  pop();
  lineAngle += 0.01; // 放射線をゆっくり回転
}

function drawCircles() {
  for (let i = 0; i < numCircles; i++) {
    let angle = TWO_PI / numCircles * i + angleOffset; // アニメーションで回転
    let x = centerX + cos(angle) * radius;
    let y = centerY + sin(angle) * radius;

    fill(circleColors[i]); // 配列から色を取得
    ellipse(x, y, 60, 60); // 各円を描画
  }
  angleOffset += 0.01; // 外周円の回転速度
}

function drawCenter() {
  // 中央の円
  fill(255, 100, 150);
  ellipse(centerX, centerY, 180, 180);

  // 中央に「国際人間科学部」の文字
  fill(0);
  textSize(22);
  textFont('Georgia'); // フォント
  text("グロ文IT", centerX, centerY);
}

// キーボード操作で回転速度を変更
function keyPressed() {
  if (key === 'A' || key === 'a') {
    angleOffset += 0.05; // 外周の回転速度を速く
  } else if (key === 'S' || key === 's') {
    angleOffset = max(0, angleOffset - 0.05); // 外周の回転速度を遅く
  }
}

