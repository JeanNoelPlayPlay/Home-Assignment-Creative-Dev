import { Application, Container, Sprite } from 'pixi.js';
import { generateSprite } from './generateSprite';
import seedrandom from 'seedrandom';
import anime from 'animejs';
import { getRandom } from './main';

export function generateBackground(
	gridsize: number,
	graphSizeX: number,
	graphSizeY: number,
	color: string,
	app: Application<HTMLCanvasElement>,
	randomNumber: seedrandom.PRNG
) {
	const backgroundContainer = new Container();
	const sprites: Sprite[] = [];
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

			sprite.rotation = getRandom(0, Math.PI);

			sprites.push(sprite);
			backgroundContainer.addChild(sprite);
		}
	}
	const timeline = anime.timeline({
		loop: true,
		autoplay: true,
	});

	timeline.add({
		targets: sprites,
		keyframes: [
			{
				rotation: (el: Sprite) => [
					el.rotation,
					el.rotation + Math.PI / 10,
				],
			},
			{
				rotation: (el: Sprite) => [
					el.rotation + Math.PI / 10,
					el.rotation,
				],
			},
		],
	});
	return backgroundContainer;
}
