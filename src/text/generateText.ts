import { Application, BitmapFont, BitmapText, Container } from 'pixi.js';
import { blur, noise } from './textFilters';
import { SECONDARY_COLOR } from '../utils/colors';

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

export function generateText(
	text: string,
	app: Application<HTMLCanvasElement>
) {
	const letters: BitmapText[] = [];
	const foregroundLetters: BitmapText[] = [];
	const backgroundLetters: BitmapText[] = [];
	const textContainer = new Container();

	let yOffset = 0;

	text.split('\n').forEach((line: string) => {
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

			xOffset += letter.width;

			lineContainer.addChild(bgLetter, letter);
			letters.push(bgLetter, letter);
			foregroundLetters.push(letter);
			backgroundLetters.push(bgLetter);
		});

		lineContainer.y = yOffset;

		textContainer.addChild(lineContainer);

		yOffset += lineContainer.height + 10;

		lineContainer.x = app.renderer.width / 2 - lineContainer.width / 2;
		textContainer.y = app.screen.height / 2 - textContainer.height / 2;
	});
	//------------------------FILTERS---------------------------//
	textContainer.filters = [noise, blur];
	//----------------------------------------------------------//

	return { textContainer, letters, foregroundLetters, backgroundLetters };
}
