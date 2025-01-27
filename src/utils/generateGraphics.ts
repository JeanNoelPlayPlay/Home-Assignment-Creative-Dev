import { Graphics } from 'pixi.js';

// export function generateGraphics(sizeX: number, sizeY: number, color: string) {
// 	const graphics = new Graphics();
// 	graphics.beginFill(color);
// 	graphics.drawRect(0, 0, sizeX, sizeY);
// 	graphics.endFill();

// 	graphics.pivot.set(sizeX / 2, sizeY / 2);

// 	return graphics;
// }

export class Rectangle extends Graphics {
	constructor(width: number, height: number, color: string) {
		super();
		this.generate(width, height, color);
	}

	private generate(width: number, height: number, color: string) {
		this.beginFill(color).drawRect(0, 0, width, height).endFill();
		this.pivot.set(width * 0.5, height * 0.5);
	}
}

// export class GraphicsGenerator {
// 	sizeX: number;
// 	sizeY: number;
// 	color: string;
// 	constructor(sizeX: number, sizeY: number, color: string) {
// 		this.sizeX = sizeX;
// 		this.sizeY = sizeY;
// 		this.color = color;
// 	}

// 	generate() {
// 		const graphic = new Graphics();
// 		graphic
// 			.beginFill(this.color)
// 			.drawRect(0, 0, this.sizeX, this.sizeY)
// 			.endFill();
// 		graphic.pivot.set(this.sizeX / 2, this.sizeY / 2);

// 		return graphic;
// 	}
// }
