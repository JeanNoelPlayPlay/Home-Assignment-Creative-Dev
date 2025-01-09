import { generateSprite } from './generateSprite';
import './style.css';
import { Application, Container } from 'pixi.js';

const PRIMARY_COLOR = '#083970';
const SECONDARY_COLOR = '#6abfb6';

const app = new Application<HTMLCanvasElement>({
	width: 500,
	height: 500,
	background: PRIMARY_COLOR,
	antialias: true,
});

globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

const graphSizeX = 20;
const graphSizeY = 5;

const gridSize = 5;

const container: Container = new Container();

for (let i = 0; i < gridSize; i++) {
	for (let j = 0; j < gridSize; j++) {
		const sprite = generateSprite(graphSizeX, graphSizeY, SECONDARY_COLOR);
		sprite.x = 0 + i * 100;
		sprite.y = 0 + j * 100;
		container.addChild(sprite);
	}
}

app.stage.addChild(container);
