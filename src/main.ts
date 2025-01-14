import './style.css';
import anime from 'animejs';
import {
	Application,
	BlurFilter,
	Container,
	DisplacementFilter,
	Filter,
	NoiseFilter,
	Point,
	SimpleRope,
	Sprite,
	Text,
	TextStyle,
} from 'pixi.js';
import { generateBackground } from './background/generateBackground';
import { randomNumber, shuffleText } from './utils/utils';
import { animateBackground } from './background/animateBackground';

const PRIMARY_COLOR = '#083970';
const SECONDARY_COLOR = '#6abfb6';

const GRAPHSIZEX = 20;
const GRAPHSIZEY = 3;

const GRIDSIZE = 5;

const app = new Application<HTMLCanvasElement>({
	width: 500,
	height: 500,
	background: PRIMARY_COLOR,
	antialias: true,
});

globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

const controlContainer = new Container();

const playBtn = Sprite.from('play.png');
const stopBtn = Sprite.from('stop.png');
playBtn.scale.set(0.11);
playBtn.anchor.set(0.5);
playBtn.x = app.stage.width / 2 - 25;

stopBtn.scale.set(0.11);
stopBtn.anchor.set(0.5);
stopBtn.x = app.stage.width / 2 + 25;

controlContainer.addChild(playBtn, stopBtn);
controlContainer.x = app.view.width / 2;
controlContainer.y = app.view.height - 25;

const { backgroundContainer, bgSprites } = generateBackground(
	GRIDSIZE,
	GRAPHSIZEX,
	GRAPHSIZEY,
	SECONDARY_COLOR,
	app,
	randomNumber
);
const bgTimeline = animateBackground(bgSprites);

backgroundContainer.x = app.screen.width / 2 - backgroundContainer.width / 2;
backgroundContainer.y = app.screen.height / 2 - backgroundContainer.height / 2;
app.stage.addChild(backgroundContainer);

const TEXT = 'Creative Developer\nat PlayPlay';
const textContainer = new Container();
const bgTextContainer = new Container();
const letters: Text[] = [];
const foregroundLetters: Text[] = [];
const backgroundLetters: Text[] = [];

const foreGroundTextStyle = new TextStyle({
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 44,
	fill: '0xffffff',
	align: 'center',
});
const backgroundTextStyle = new TextStyle({
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 44,
	fill: SECONDARY_COLOR,
	align: 'center',
});

let yOffset = 0;

TEXT.split('\n').forEach((line) => {
	let xOffset = 0;
	const lineContainer = new Container();

	line.split('').forEach((char) => {
		const letter: Text = new Text(char, foreGroundTextStyle);
		const bgLetter: Text = new Text(char, backgroundTextStyle);

		letter.x = xOffset;
		bgLetter.x = xOffset;

		bgLetter.y = 1;

		letter.alpha = 0;
		bgLetter.alpha = 0;

		xOffset += letter.width;

		lineContainer.addChild(bgLetter, letter);
		letters.push(bgLetter, letter);
		foregroundLetters.push(letter);
		backgroundLetters.push(bgLetter);
	});

	lineContainer.x = app.renderer.width / 2 - lineContainer.width / 2;
	lineContainer.y = yOffset;

	textContainer.addChild(lineContainer);

	yOffset += lineContainer.height + 10;
});

textContainer.y = (app.renderer.height - yOffset) / 2;

const noise = new NoiseFilter(0.1, 1);
const blur = new BlurFilter(0.3, 4);

textContainer.filters = [noise, blur];

const shuffledLetters = shuffleText(letters, randomNumber);

for (let i = 0; i < foregroundLetters.length; i++) {
	anime({
		targets: letters,
		duration: 2000,
		direction: 'alternate',
		loop: true,
		// delay: (el, i) => i * 100,
		easing: 'easeInOutSine',
	});
}
// for (let i = 0; i < foregroundLetters.length; i++) {
// 	anime({
// 		targets: [foregroundLetters[i], backgroundLetters[i]],
// 		y: () => anime.random(-2, 2),
// 	});
// }
// anime({
// 	targets: [letters],

// 	y: () => anime.random(-2, 2),
// 	delay: 500,
// 	duration: 2000,
// 	direction: 'alternate',
// 	loop: true,
// 	easing: 'easeInOutSine',
// });
const timeline = anime.timeline({
	easing: 'easeInOutSine',
	duration: 400,
	autoplay: false,
});
timeline.add({
	targets: letters,
	alpha: 1,
	delay: (el, i) => i * 30,
	duration: 500,
});

playBtn.eventMode = 'static';
stopBtn.eventMode = 'static';

playBtn.onclick = () => {
	timeline.play();
	bgTimeline.play();
};
stopBtn.onclick = () => {
	timeline.pause();
	bgTimeline.pause();
};
app.stage.addChild(bgTextContainer);
app.stage.addChild(textContainer);
app.stage.addChild(controlContainer);
