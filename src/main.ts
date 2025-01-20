import './style.css';
import { Application, BitmapFont } from 'pixi.js';
import { generateBackground } from './background/generateBackground';
import { randomNumber, shuffleText } from './utils/utils';
import { animateBackground } from './background/animateBackground';
// import { createPlayBtn, createStopBtn } from './controls/generateBtn';
import { generateText } from './text/generateText';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './utils/colors';
import { animateText } from './text/animateText';
import anime from 'animejs';

const GRAPHSIZEX = 20;
const GRAPHSIZEY = 3;
const GRIDSIZE = 5;

const TEXT = 'Creative Developer\nat PlayPlay';

const app = new Application<HTMLCanvasElement>({
	width: 500,
	height: 500,
	background: PRIMARY_COLOR,
	antialias: true,
});

// globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

//------------------------ BACKGROUND ---------------------------//

// Create background
const { backgroundContainer, bgGraph } = generateBackground(
	GRIDSIZE,
	GRAPHSIZEX,
	GRAPHSIZEY,
	SECONDARY_COLOR,
	app,
	randomNumber
);
backgroundContainer.x = app.screen.width / 2 - backgroundContainer.width / 2;
backgroundContainer.y = app.screen.height / 2 - backgroundContainer.height / 2;
app.stage.addChild(backgroundContainer);

//------------------------BITMAPFONT STYLE---------------------------//
BitmapFont.from('foregroundFont', {
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 44,
	fill: '0xffffff',
	align: 'center',
});

BitmapFont.from('backgroundFont', {
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 44,
	fill: SECONDARY_COLOR,
	align: 'center',
});

//------------------------ TEXT ---------------------------//
// create text
const { textContainer, letters, foregroundLetters, backgroundLetters } =
	generateText(TEXT, app);

const shuffledLetters = shuffleText(letters, randomNumber);
app.stage.addChild(textContainer);

//---------------------------------------------------------//

//----------------------------CONTROLS----------------------------//
// const controlContainer = new Container();

// const play = createPlayBtn();
// const stop = createStopBtn();

// stop.x = play.width + 15;

// controlContainer.addChild(play, stop);
// controlContainer.x =
// 	app.screen.width / 2 - controlContainer.width / 2 + play.width / 2;
// controlContainer.y = app.screen.height - 25;

// play.onclick = () => {
// 	textTimeline.play();
// 	bgTimeline.play();
// };
// stop.onclick = () => {
// 	textTimeline.pause();
// 	bgTimeline.pause();
// };
// controlContainer.scale.set(0.7);
// app.stage.addChild(controlContainer);
//--------------------------------------------------------------//

const controlsProgressEl: HTMLInputElement | null = document.querySelector(
	'.seek-anim-demo .progress'
);

const timelineAnimation = anime.timeline({
	autoplay: false,
	duration: 4000,
	easing: 'easeInOutSine',
	update: function () {
		if (controlsProgressEl) {
			controlsProgressEl.value = timelineAnimation.progress.toString();
		}
	},
});
// Animate background
animateBackground(bgGraph, timelineAnimation);

// Animate text
animateText(
	shuffledLetters,
	foregroundLetters,
	backgroundLetters,
	timelineAnimation
);
const playBtn: HTMLButtonElement | null = document.querySelector('.playBtn');
if (playBtn) {
	playBtn.onclick = timelineAnimation.play;
}
const stopBtn: HTMLButtonElement | null = document.querySelector('.stopBtn');
if (stopBtn) {
	stopBtn.onclick = timelineAnimation.pause;
}

if (controlsProgressEl) {
	controlsProgressEl.addEventListener('input', function () {
		timelineAnimation.seek(
			timelineAnimation.duration * (+controlsProgressEl.value / 100)
		);
	});
}
