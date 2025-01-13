import './style.css';
import seedrandom from 'seedrandom';
import { Application, Container, Text, TextStyle } from 'pixi.js';
import { generateBackground } from './generateBackground';
import anime from 'animejs';

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

export function getRandom(min: number, max: number) {
	return randomNumber() * (max - min) + min;
}

const backgroundContainer: Container | undefined = generateBackground(
	GRIDSIZE,
	GRAPHSIZEX,
	GRAPHSIZEY,
	SECONDARY_COLOR,
	app,
	randomNumber
);

if (backgroundContainer) {
	backgroundContainer.x =
		app.screen.width / 2 - backgroundContainer.width / 2;
	backgroundContainer.y =
		app.screen.height / 2 - backgroundContainer.height / 2;
	app.stage.addChild(backgroundContainer);
}

const TEXT = 'Creative Developer';
const textContainer = new Container();
const bgTextContainer = new Container();
let xOffset = 0;
const yBgOffset = 2;
const foregroundLetters: Text[] = [];
const backgroundLetters: Text[] = [];

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

TEXT.split('').forEach((char) => {
	console.log(char);
	const letter: Text = new Text(char, foreGroundTextStyle);
	const bgLetter: Text = new Text(char, backgroundTextStyle);
	letter.x = xOffset;
	bgLetter.x = xOffset;
	bgLetter.y = yBgOffset;
	letter.alpha = 0;
	bgLetter.alpha = 0;
	xOffset += letter.width;
	textContainer.addChild(letter);
	bgTextContainer.addChild(bgLetter);
	foregroundLetters.push(letter);
	backgroundLetters.push(bgLetter);
});

textContainer.x = (app.renderer.width - textContainer.width) / 2;
textContainer.y = (app.renderer.height - textContainer.height) / 2;
bgTextContainer.x = (app.renderer.width - bgTextContainer.width) / 2;
bgTextContainer.y = (app.renderer.height - bgTextContainer.height) / 2;

function shuffle(array: Text[]) {
	return array.sort(() => randomNumber() - 0.5);
}

const shuffleLetters = shuffle(foregroundLetters);
const shuffledBgLetters = shuffle(backgroundLetters);

anime.timeline().add({
	targets: shuffledBgLetters,
	alpha: 1,
	delay: (el, i) => i * 100,
	easing: 'easeInOutQuad',
	duration: 500,
});
anime.timeline().add({
	targets: shuffleLetters,
	alpha: 1,
	delay: (el, i) => i * 100,
	easing: 'easeInOutQuad',
	duration: 1000,
});

app.stage.addChild(bgTextContainer);
app.stage.addChild(textContainer);
