import seedrandom from 'seedrandom';
import { generateSprite } from './generateSprite';
import './style.css';
import { Application, Container, Sprite, Text, TextStyle } from 'pixi.js';
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

const backgroundContainer: Container = new Container();
const sprites: Sprite[] = [];

const randomNumber = seedrandom('hello');
console.log(randomNumber());

function getRandom(min: number, max: number) {
	return randomNumber() * (max - min) + min;
}

for (let i = 0; i < GRIDSIZE; i++) {
	for (let j = 0; j < GRIDSIZE; j++) {
		const sprite = generateSprite(GRAPHSIZEX, GRAPHSIZEY, SECONDARY_COLOR);
		sprite.x =
			0 +
			i * (app.screen.width / GRIDSIZE) +
			(app.screen.width / GRIDSIZE / 2) * randomNumber();
		sprite.y =
			0 +
			j * (app.screen.height / GRIDSIZE) +
			(app.screen.height / GRIDSIZE / 2) * randomNumber();

		// if (j % 2 === 0) {
		// 	sprite.rotation = Math.PI * randomNumber() + Math.PI / 2;
		// } else {
		// 	sprite.rotation = Math.PI * randomNumber() - Math.PI / 2;
		// }

		sprite.rotation = getRandom(0, Math.PI);

		sprites.push(sprite);
		backgroundContainer.addChild(sprite);
	}
}

backgroundContainer.x = app.screen.width / 2 - backgroundContainer.width / 2;
backgroundContainer.y = app.screen.height / 2 - backgroundContainer.height / 2;
app.stage.addChild(backgroundContainer);

const timeline = anime.timeline({
	loop: true,
	autoplay: true,
});

timeline.add({
	targets: sprites,
	// keyframes: [{ rotation: random }, { rotation: random + Math.PI / 10 }],
	keyframes: [
		{
			rotation: (el: Sprite) => [el.rotation, el.rotation + Math.PI / 10],
		},
		{
			rotation: (el: Sprite) => [el.rotation + Math.PI / 10, el.rotation],
		},
	],
	// duration: 1000,
	// delay: 500,
	// easing: 'steps(1)',
});

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
