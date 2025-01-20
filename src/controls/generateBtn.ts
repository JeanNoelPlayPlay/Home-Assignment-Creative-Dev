import { Graphics } from 'pixi.js';

export function createPlayBtn() {
	const playBtn = new Graphics().beginFill('fff').lineStyle(1, 'fff', 1);

	playBtn.beginFill('fff', 0).drawCircle(20, 20, 20);

	playBtn
		.beginFill('fff')
		.moveTo(15, 10)
		.lineTo(30, 20)
		.lineTo(15, 30)
		.lineTo(15, 10);

	playBtn.pivot.set(20, 20);
	playBtn.eventMode = 'static';
	playBtn.cursor = 'pointer';

	return playBtn;
}

export function createStopBtn() {
	const stopBtn = new Graphics().beginFill('fff').lineStyle(1, 'fff', 1);

	stopBtn.beginFill('fff', 0).drawCircle(20, 20, 20);
	stopBtn.beginFill('fff').drawRect(10, 10, 20, 20);

	stopBtn.pivot.set(20, 20);
	stopBtn.eventMode = 'static';
	stopBtn.cursor = 'pointer';
	return stopBtn;
}
