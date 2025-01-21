import { BitmapText } from 'pixi.js';
import seedrandom from 'seedrandom';

// shuffle array of text
export function shuffleText(
	array: BitmapText[],
	randomNumber: seedrandom.PRNG
) {
	return array.sort(() => randomNumber() - 0.5);
}

// create randomNumber with seedrandom
export const randomNumber: seedrandom.PRNG = seedrandom('hello');

//  get a random number within a min and max range
export function getRandomRandom(min: number, max: number) {
	return randomNumber() * (max - min) + min;
}
