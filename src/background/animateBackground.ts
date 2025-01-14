import anime from 'animejs';

import { Sprite } from 'pixi.js';

export function animateBackground(sprites: Sprite[]) {
	const timeline = anime.timeline({
		loop: true,
		autoplay: false,
	});

	timeline.add({
		targets: sprites,
		keyframes: [
			{
				rotation: (el: Sprite) => [
					el.rotation,
					el.rotation + Math.PI / 10,
				],
			},
			{
				rotation: (el: Sprite) => [
					el.rotation + Math.PI / 10,
					el.rotation,
				],
			},
		],
	});
	return timeline;
}
