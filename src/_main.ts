import anime from 'animejs';
import { Application, Container, Text } from 'pixi.js';

const app = new Application({
	width: window.innerWidth,
	height: window.innerHeight,
	backgroundColor: 0x1099bb,
});

globalThis.__PIXI_APP__ = app;

document.body.appendChild(app.view);

// Création d'un container
const container = new Container();
app.stage.addChild(container);

// Grille de texte
const rows = 6;
const cols = 12;
const spacingX = 80;
const spacingY = 60;

const textElements = [];
for (let row = 0; row < rows; row++) {
	for (let col = 0; col < cols; col++) {
		const text = new Text(`(${col}, ${row})`, {
			fontSize: 14,
			fill: 0xffffff,
		});
		text.anchor.set(0.5);
		text.x = col * spacingX;
		text.y = row * spacingY;
		container.addChild(text);
		textElements.push({ text, row, col });
	}
}

// Centrer le container
container.x = (app.renderer.width - cols * spacingX) / 2;
container.y = (app.renderer.height - rows * spacingY) / 2;

// Animation de type mesh
anime({
	targets: textElements,
	duration: 2000,
	easing: 'easeInOutSine',
	loop: true,
	direction: 'alternate',
	update: (anim) => {
		textElements.forEach(({ text, row, col }) => {
			const progress = anim.progress / 100;
			// const waveX =
			// 	Math.sin(((col + progress * 2) * Math.PI) / cols) * 25;
			const waveY =
				Math.cos(((row + progress * 2) * Math.PI) / rows) * 15;
			console.log('waveY :', waveY);

			// const skewX = Math.sin(((row + progress) * Math.PI) / rows) * 0.2;

			// text.x = col * spacingX + waveX;
			text.y = row * spacingY + waveY;
			// console.log(text.y);

			// text.skew.x = skewX;
		});
	},
});
