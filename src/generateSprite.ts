import { Container, Sprite, Texture } from 'pixi.js';

export function generateSprite(sizeX: number, sizeY: number, color: string) {
	const spriteContainer: Container = new Container();

	const sprite: Sprite = new Sprite(Texture.WHITE);
	sprite.width = sizeX;
	sprite.height = sizeY;
	sprite.anchor.set(0.5);
	sprite.tint = color;

	spriteContainer.addChild(sprite);

	return spriteContainer;
}
