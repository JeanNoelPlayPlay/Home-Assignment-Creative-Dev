import anime from 'animejs';
import { BitmapText } from 'pixi.js';

export function animateText(
	shuffledLetters: BitmapText[],
	foregroundLetters: BitmapText[],
	backgroundLetters: BitmapText[]
) {
	const timeline = anime.timeline({
		autoplay: false,
		duration: 4000,
		loop: true,
	});
	timeline.add({
		targets: shuffledLetters,
		alpha: [0, 1],
		delay: (el, i: number) => i * 15,
		duration: 1000,
		easing: 'easeInOutSine',
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
	return timeline;
}
