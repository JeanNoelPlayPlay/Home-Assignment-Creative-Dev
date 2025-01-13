import './style.css';
import seedrandom from 'seedrandom';
import anime from 'animejs';
import {
	Application,
	Container,
	Sprite,
	Text,
	TextStyle,
	Texture,
} from 'pixi.js';
import { generateBackground } from './generateBackground';

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

const randomNumber: seedrandom.PRNG = seedrandom('hello');
console.log(randomNumber());

const controlContainer = new Container();
const playBtnTexture = Texture.from('play-solid.svg');
const stopBtnTexture = Texture.from('stop-solid.svg');

const playBtn = new Sprite(playBtnTexture);
const stopBtn = new Sprite(stopBtnTexture);
playBtn.scale.set(0.2);
playBtn.anchor.set(0.5);
playBtn.x = app.stage.width / 2 - 50;

stopBtn.scale.set(0.2);
stopBtn.anchor.set(0.5);
stopBtn.x = app.stage.width / 2 + 50;

controlContainer.addChild(playBtn, stopBtn);
controlContainer.x = app.view.width / 2;
controlContainer.y = app.view.height - 50;

export function getRandom(min: number, max: number) {
	return randomNumber() * (max - min) + min;
}

function shuffleText(array: Text[]) {
	return array.sort(() => randomNumber() - 0.5);
}

const backgroundContainer: Container = generateBackground(
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

const TEXT = 'Creative Developer\nat PlayPlay';
const textContainer = new Container();
const bgTextContainer = new Container();
const letters: Text[] = [];
const bgLetters: Text[] = [];

const foreGroundTextStyle = new TextStyle({
	fontFamily: 'Arial',
	fontSize: 44,
	fill: '0xffffff',
	align: 'center',
});
const backgroundTextStyle = new TextStyle({
	fontFamily: 'Arial',
	fontSize: 44,
	fill: SECONDARY_COLOR,
	align: 'center',
});

let yOffset = 0;

TEXT.split('\n').forEach((line) => {
	let xOffset = 0;

	line.split('').forEach((char) => {
		const letter: Text = new Text(char, foreGroundTextStyle);
		const bgLetter: Text = new Text(char, backgroundTextStyle);

		letter.x = xOffset;
		letter.y = yOffset;
		letter.alpha = 0;

		bgLetter.x = xOffset;
		bgLetter.y = yOffset + 1;
		bgLetter.alpha = 0;

		xOffset += letter.width;

		textContainer.addChild(bgLetter, letter);
		letters.push(bgLetter, letter);
		// bgLetters.push(bgLetter);
	});
	yOffset += 100;
});

textContainer.x = (app.renderer.width - textContainer.width) / 2;
textContainer.y = (app.renderer.height - textContainer.height) / 2;
bgTextContainer.x = (app.renderer.width - bgTextContainer.width) / 2;
bgTextContainer.y = (app.renderer.height - bgTextContainer.height) / 2;

const shuffledLetters = shuffleText(letters);
// const shuffledBgLetters = shuffleText(bgLetters);

const timeline = anime.timeline({
	easing: 'easeInOutSine',
	duration: 400,
	autoplay: false,
});
timeline.add({
	targets: shuffledLetters,
	alpha: 1, // Faire apparaître progressivement
	delay: (el, i) => i * 30, // Décalage progressif
	duration: 500,
});
for (const letter of letters) {
	timeline.add({
		targets: letter,
		y: [
			{ value: -5, duration: 400 },
			{ value: 5, duration: 400 },
		],
		direction: 'alternate',
		loop: true,
		easing: 'easeInOutSine',
	});
}

playBtn.eventMode = 'static';
stopBtn.eventMode = 'static';

playBtn.onclick = timeline.play;
stopBtn.onclick = timeline.pause;

app.stage.addChild(bgTextContainer);
app.stage.addChild(textContainer);
app.stage.addChild(controlContainer);
