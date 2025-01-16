import { Graphics } from 'pixi.js';

export function generateGraphics(sizeX: number, sizeY: number, color: string) {
	const graphics = new Graphics();
	graphics.beginFill(color);
	graphics.drawRect(0, 0, sizeX, sizeY);
	graphics.endFill();

	graphics.pivot.set(sizeX / 2, sizeY / 2);

	return graphics;
}
