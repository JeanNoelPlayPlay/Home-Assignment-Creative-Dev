import { Application, Container, Sprite } from 'pixi.js';
import { generateSprite } from '../generateSprite';
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
	const bgSprites: Sprite[] = [];
	for (let i = 0; i < gridsize; i++) {
		for (let j = 0; j < gridsize; j++) {
			const sprite = generateSprite(graphSizeX, graphSizeY, color);
			sprite.x =
				0 +
				i * (app.screen.width / gridsize) +
				(app.screen.width / gridsize / 2) * randomNumber();
			sprite.y =
				0 +
				j * (app.screen.height / gridsize) +
				(app.screen.height / gridsize / 2) * randomNumber();

			sprite.rotation = getRandomRandom(0, Math.PI);

			bgSprites.push(sprite);
			backgroundContainer.addChild(sprite);
		}
	}

	return { backgroundContainer, bgSprites };
}
