import './style.css';
import { Application, BitmapFont, Container } from 'pixi.js';
import { generateBackground } from './background/generateBackground';
import { randomNumber, shuffleText } from './utils/utils';
import { animateBackground } from './background/animateBackground';
import { createPlayBtn, createStopBtn } from './controls/generateBtn';
import { generateText } from './text/generateText';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './utils/colors';
import { animateText } from './text/animateText';

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

globalThis.__PIXI_APP__ = app;

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
// Animate background
const bgTimeline = animateBackground(bgGraph);

// Animate text
const textTimeline = animateText(
	shuffledLetters,
	foregroundLetters,
	backgroundLetters
);

//----------------------------CONTROLS----------------------------//
const controlContainer = new Container();

const play = createPlayBtn();
const stop = createStopBtn();

stop.x = play.width + 15;

controlContainer.addChild(play, stop);
controlContainer.x =
	app.screen.width / 2 - controlContainer.width / 2 + play.width / 2;
controlContainer.y = app.screen.height - 25;

play.onclick = () => {
	textTimeline.play();
	bgTimeline.play();
};
stop.onclick = () => {
	textTimeline.pause();
	bgTimeline.pause();
};
controlContainer.scale.set(0.7);
app.stage.addChild(controlContainer);
//--------------------------------------------------------------//
