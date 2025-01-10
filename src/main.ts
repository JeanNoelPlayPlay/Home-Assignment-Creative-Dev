import './style.css';
import seedrandom from 'seedrandom';
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

// const foreGroundTextStyle = new TextStyle({
// 	fontFamily: 'Arial',
// 	fontSize: 54,
// 	fill: '0xffffff',
// 	align: 'center',
// });

// const foregroundText: Text = new Text(
// 	'Creative Developer \n at PlayPlay',
// 	foreGroundTextStyle
// );

// foregroundText.anchor.set(0.5);
// foregroundText.x = app.screen.width / 2;
// foregroundText.y = app.screen.height / 2;

// app.stage.addChild(foregroundText);
