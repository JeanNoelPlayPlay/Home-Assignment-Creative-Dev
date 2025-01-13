import './style.css';
import seedrandom from 'seedrandom';
import anime from 'animejs';
import { Application, Container, Text, TextStyle } from 'pixi.js';
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

const TEXT = 'Creative Developer';
const textContainer = new Container();
const bgTextContainer = new Container();
let xOffset = 0;
const yBgOffset = 1;
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

TEXT.split('').forEach((char) => {
	const letter: Text = new Text(char, foreGroundTextStyle);
	const bgLetter: Text = new Text(char, backgroundTextStyle);
	letter.x = xOffset;
	bgLetter.x = xOffset;
	bgLetter.y = yBgOffset;
	letter.alpha = 0;
	bgLetter.alpha = 0;
	xOffset += letter.width;
	textContainer.addChild(bgLetter, letter);
	letters.push(bgLetter, letter);
	// bgLetters.push(bgLetter);
});

textContainer.x = (app.renderer.width - textContainer.width) / 2;
textContainer.y = (app.renderer.height - textContainer.height) / 2;
bgTextContainer.x = (app.renderer.width - bgTextContainer.width) / 2;
bgTextContainer.y = (app.renderer.height - bgTextContainer.height) / 2;

const shuffledLetters = shuffleText(letters);

// const shuffledBgLetters = shuffleText(bgLetters);
console.log(shuffledLetters);
const timeline = anime
	.timeline({
		easing: 'easeInOutSine',
		duration: 4000,
	})
	.add({
		targets: [shuffledLetters],
		alpha: 1,
		delay: (el, i) => i * 100,
		easing: 'easeInOutQuad',
		duration: 500,
	});
// for (const letter of letters) {
// 	console.log(letter.text, letter.x, letter.y);
// 	timeline.add(
// 		{
// 			targets: letter,
// 			x: function (el, i) {
// 				return [el.x - 5, el.x + 5];
// 			},
// 			y: function (el, i) {
// 				return [el.y - 5, el.y + 5];
// 			},
// 			// duration: 4000,
// 			delay: anime.stagger(10),
// 			easing: 'easeInOutSine',
// 			loop: true,
// 			direction: 'alternate',
// 		},
// 		'-=500'
// 	);
// }

app.stage.addChild(bgTextContainer);
app.stage.addChild(textContainer);
