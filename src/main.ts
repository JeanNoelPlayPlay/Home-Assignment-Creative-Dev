import './style.css';
import { Application } from 'pixi.js';
import { generateBackground } from './background/_generateBackground';
import { randomNumber, shuffleText } from './utils/utils';
import { animateBackground } from './background/animateBackground';
import { generateText } from './text/generateText';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './utils/colors';
import { animateText } from './text/animateText';
import anime from 'animejs';
import { Background } from './background/classes/Background';

const GRAPHSIZEX = 20;
const GRAPHSIZEY = 3;
const GRIDSIZE = 5;

const TEXT = 'Crea&tive Developer\nat PlayPlay';

const app = new Application<HTMLCanvasElement>({
	width: 500,
	height: 500,
	background: PRIMARY_COLOR,
	antialias: true,
});

// globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

//------------------------ BACKGROUND -----------------------//

// Create background
// const { backgroundContainer, bgGraph } = generateBackground(
// 	GRIDSIZE,
// 	GRAPHSIZEX,
// 	GRAPHSIZEY,
// 	SECONDARY_COLOR,
// 	app,
// 	randomNumber
// );
const background = new Background(
	GRIDSIZE,
	GRAPHSIZEX,
	GRAPHSIZEY,
	SECONDARY_COLOR,
	app,
	randomNumber
);

background.x = app.screen.width / 2 - background.width / 2;
background.y = app.screen.height / 2 - background.height / 2;
app.stage.addChild(background);

//------------------------ TEXT ---------------------------//
// create text
const { textContainer, letters, foregroundLetters, backgroundLetters } =
	generateText(TEXT, app);

const shuffledLetters = shuffleText(letters, randomNumber);
app.stage.addChild(textContainer);

//---------------------------------------------------------//

//------------------------ CONTROLS ---------------------------//

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
animateBackground(background.bgGraph, timelineAnimation);

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
const restartBtn: HTMLButtonElement | null =
	document.querySelector('.restartBtn');
if (restartBtn) {
	restartBtn.onclick = timelineAnimation.restart;
}

if (controlsProgressEl) {
	controlsProgressEl.addEventListener('input', function () {
		timelineAnimation.seek(
			timelineAnimation.duration * (+controlsProgressEl.value / 100)
		);
	});
}
