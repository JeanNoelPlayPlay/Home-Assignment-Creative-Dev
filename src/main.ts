import seedrandom from 'seedrandom';
import { generateSprite } from './generateSprite';
import './style.css';
import { Application, Container } from 'pixi.js';
import { generateBackground } from './generateBackground';
import { generateRandomNumber } from './generateRandomNumber';

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

const container: Container = new Container();
const randomNumber = seedrandom('hello');
console.log(randomNumber());

for (let i = 0; i < GRIDSIZE; i++) {
	for (let j = 0; j < GRIDSIZE; j++) {
		const sprite = generateSprite(GRAPHSIZEX, GRAPHSIZEY, SECONDARY_COLOR);
		sprite.x = 0 + i * 100 + 50 * randomNumber();
		sprite.y = 0 + j * 100 + 50 * randomNumber();

		if (j % 2 === 0) {
			sprite.rotation = Math.PI * randomNumber() + Math.PI / 2;
		} else {
			sprite.rotation = Math.PI * randomNumber() - Math.PI / 2;
		}
		container.addChild(sprite);
	}
}

app.stage.addChild(container);
