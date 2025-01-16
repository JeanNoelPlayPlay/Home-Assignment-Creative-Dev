import anime from 'animejs';

import { Graphics } from 'pixi.js';

export function animateBackground(graphics: Graphics[]) {
	const timeline = anime.timeline({
		loop: true,
		autoplay: false,
	});

	timeline.add({
		targets: graphics,
		keyframes: [
			{
				rotation: (el: Graphics) => [
					el.rotation,
					el.rotation + Math.PI / 10,
				],
			},
			{
				rotation: (el: Graphics) => [
					el.rotation + Math.PI / 10,
					el.rotation,
				],
			},
		],
	});
	return timeline;
}
