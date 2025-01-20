import anime from 'animejs';
import { BitmapText } from 'pixi.js';

export function animateText(
	shuffledLetters: BitmapText[],
	foregroundLetters: BitmapText[],
	backgroundLetters: BitmapText[],
	timeline: anime.AnimeTimelineInstance
) {
	timeline.add(
		{
			targets: shuffledLetters,
			alpha: [0, 1],
			delay: (_el, i: number) => i * 15,
			duration: 1000,
			easing: 'easeInOutSine',
		},
		'-=2000'
	);

	for (let i = 0; i < foregroundLetters.length; i++) {
		timeline.add(
			{
				targets: [foregroundLetters[i], backgroundLetters[i]],
				y: [{ value: 0 }, { value: -5 }, { value: 0 }],
				delay: (_el, i) => i * 10,
				duration: 400,
				loop: true,
				easing: 'easeInOutSine',
			},
			'-=400'
		);
	}
	return timeline;
}
