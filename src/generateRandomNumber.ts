import seedrandom from 'seedrandom';

const randomNumber = seedrandom('hello');

export function generateRandomNumber(min = 0, max = 1) {
	return randomNumber() * (max - min) + min;
}
