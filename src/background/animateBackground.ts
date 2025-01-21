import anime from 'animejs';

import { Graphics } from 'pixi.js';

export function animateBackground(
	graphics: Graphics[],
	timeline: anime.AnimeTimelineInstance
) {
	timeline.add({
		targets: graphics,
		keyframes: [
			{
				rotation: (el: Graphics) => [
					el.rotation,
					el.rotation + Math.PI / 10,
				],
				delay: 100,
			},
			{
				rotation: (el: Graphics) => [
					el.rotation + Math.PI / 10,
					el.rotation,
				],
			},
			{
				rotation: (el: Graphics) => [
					el.rotation,
					el.rotation + Math.PI / 10,
				],
				delay: 100,
			},
			{
				rotation: (el: Graphics) => [
					el.rotation + Math.PI / 10,
					el.rotation,
				],
			},
			// {
			// 	rotation: (el: Graphics) => [
			// 		el.rotation,
			// 		el.rotation + Math.PI / 10,
			// 	],
			// 	delay: 100,
			// },
			// {
			// 	rotation: (el: Graphics) => [
			// 		el.rotation + Math.PI / 10,
			// 		el.rotation,
			// 	],
			// },
		],
		easing: 'steps(1)',
		// duration: 3000,
		loop: true,
	});
	return timeline;
}
