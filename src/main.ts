import './style.css';
import anime from 'animejs';
import {
	Application,
	BitmapFont,
	BitmapText,
	BlurFilter,
	Container,
	MSAA_QUALITY,
	NoiseFilter,
	Point,
	Renderer,
	SimpleRope,
	Sprite,
} from 'pixi.js';
import { generateBackground } from './background/generateBackground';
import { randomNumber, shuffleText } from './utils/utils';
import { animateBackground } from './background/animateBackground';
import { renderToTexture } from './renderTexture/renderTexture';
import { createPlayBtn, createStopBtn } from './controls/generateBtn';

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

const { backgroundContainer, bgGraph } = generateBackground(
	GRIDSIZE,
	GRAPHSIZEX,
	GRAPHSIZEY,
	SECONDARY_COLOR,
	app,
	randomNumber
);
const bgTimeline = animateBackground(bgGraph);

backgroundContainer.x = app.screen.width / 2 - backgroundContainer.width / 2;
backgroundContainer.y = app.screen.height / 2 - backgroundContainer.height / 2;
app.stage.addChild(backgroundContainer);

const TEXT = 'Creative Developer\nat PlayPlay';
const textContainer = new Container();

const letters: BitmapText[] = [];
const foregroundLetters: BitmapText[] = [];
const backgroundLetters: BitmapText[] = [];

//------------------------BITMAPFONT STYLE---------------------------//
BitmapFont.from('foregroundFont', {
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 44,
	fill: '0xffffff',
	align: 'center',
});
BitmapFont.from('backgroundFont', {
	fontFamily: 'Arial',
	fontWeight: 'bold',
	fontSize: 44,
	fill: SECONDARY_COLOR,
	align: 'center',
});
//-------------------------------------------------------------//

//------------------------FILTERS---------------------------//
const noise = new NoiseFilter(0.1, Math.random());
const blur = new BlurFilter(0.1, 4);
textContainer.filters = [noise, blur];
//----------------------------------------------------------//

let yOffset = 0;

TEXT.split('\n').forEach((line) => {
	let xOffset = 0;
	const lineContainer = new Container();

	line.split('').forEach((char) => {
		const letter: BitmapText = new BitmapText(char, {
			fontName: 'foregroundFont',
		});
		const bgLetter: BitmapText = new BitmapText(char, {
			fontName: 'backgroundFont',
		});

		letter.x = xOffset;
		bgLetter.x = xOffset;

		bgLetter.y = 1;

		// letter.alpha = 0;
		// bgLetter.alpha = 0;

		xOffset += letter.width;

		lineContainer.addChild(bgLetter, letter);
		letters.push(bgLetter, letter);
		foregroundLetters.push(letter);
		backgroundLetters.push(bgLetter);
	});

	lineContainer.x = app.renderer.width / 2 - lineContainer.width / 2;
	lineContainer.y = yOffset;

	textContainer.addChild(lineContainer);

	yOffset += lineContainer.height + 10;
});

// textContainer.y = (app.renderer.height - yOffset) / 2;

const shuffledLetters = shuffleText(letters, randomNumber);

const renderer = app.renderer as unknown as Renderer;

const renderTexture = renderToTexture(
	renderer,
	textContainer,
	MSAA_QUALITY.LOW
);

let count = 0;
const ropeLength = 90;
const points: Point[] = [];
for (let i = 0; i < 10; i++) {
	points.push(new Point(i * ropeLength, 0));
}

const strip = new SimpleRope(renderTexture, points);
const textureContainer = new Container();
textureContainer.scale.set(0.5);
textureContainer.addChild(strip);

textureContainer.x = app.screen.width / 2 - textureContainer.width / 2;
textureContainer.y = app.screen.height / 2 - textureContainer.height / 2;
app.stage.addChild(textureContainer);

const sprite = Sprite.from(renderTexture);
// app.stage.addChild(sprite);

const timeline = anime
	.timeline({
		easing: 'easeInOutSine',
		duration: 4000,
		autoplay: false,
		update: () => {
			count += 0.1;
			for (let i = 0; i < points.length; i++) {
				points[i].y = Math.sin(i * 0.5 + count) * 5;
				points[i].x = i * ropeLength + Math.cos(i * 0.3 + count) * 5;
			}

			const result = renderToTexture(
				renderer,
				textContainer,
				MSAA_QUALITY.NONE,
				undefined,
				renderTexture
			);
		},
	})
	.add({
		targets: shuffledLetters,
		alpha: [0, 1],
		delay: (el, i) => i * 15,
		duration: 1000,
	});

for (let i = 0; i < foregroundLetters.length; i++) {
	timeline.add(
		{
			targets: [foregroundLetters[i], backgroundLetters[i]],
			y: [{ value: 0 }, { value: -5 }, { value: 0 }],
			delay: (el, i) => i * 10,
			duration: 400,
			loop: true,
			easing: 'easeInOutSine',
		},
		'-=400'
	);
}
//----------------------------CONTROLS----------------------------//

const controlContainer = new Container();

const play = createPlayBtn();
const stop = createStopBtn();
play.x = 0;
stop.x = play.width + 15;
controlContainer.addChild(play, stop);
controlContainer.x =
	app.screen.width / 2 - controlContainer.width / 2 + play.width / 2;
controlContainer.y = app.screen.height - 25;

play.eventMode = 'static';
stop.eventMode = 'static';

play.onclick = () => {
	timeline.play();
	bgTimeline.play();
};
stop.onclick = () => {
	timeline.pause();
	bgTimeline.pause();
};

app.stage.addChild(textContainer);
app.stage.addChild(controlContainer);
