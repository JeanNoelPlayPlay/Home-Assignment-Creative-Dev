import { Application, Container, Graphics } from 'pixi.js';
import { generateGraphics } from '../utils/generateGraphics';
import seedrandom from 'seedrandom';
import { getRandomRandom } from '../utils/utils';

export function generateBackground(
	gridsize: number,
	graphSizeX: number,
	graphSizeY: number,
	color: string,
	app: Application<HTMLCanvasElement>,
	randomNumber: seedrandom.PRNG
) {
	const backgroundContainer = new Container();
	const bgGraph: Graphics[] = [];
	for (let i = 0; i < gridsize; i++) {
		for (let j = 0; j < gridsize; j++) {
			const graph = generateGraphics(graphSizeX, graphSizeY, color);
			graph.x =
				0 +
				i * (app.screen.width / gridsize) +
				(app.screen.width / gridsize / 2) * randomNumber();
			graph.y =
				0 +
				j * (app.screen.height / gridsize) +
				(app.screen.height / gridsize / 2) * randomNumber();

			graph.rotation = getRandomRandom(0, Math.PI);

			bgGraph.push(graph);
			backgroundContainer.addChild(graph);
		}
	}

	return { backgroundContainer, bgGraph };
}
