import {
	BaseRenderTexture,
	DisplayObject,
	MSAA_QUALITY,
	Renderer,
	RenderTexture,
	SCALE_MODES,
} from 'pixi.js';

export function renderToTexture(
	renderer: Renderer,
	displayObject: DisplayObject,
	multisample: MSAA_QUALITY,
	textureOptions?: {
		height: number;
		width: number;
		resolution?: number;
	},
	renderTexture: RenderTexture | null = null
) {
	let overrideRenderTexture: RenderTexture | undefined;

	if (renderTexture === null) {
		const baseRenderTexture = new BaseRenderTexture({
			height:
				textureOptions?.height ?? displayObject.getLocalBounds().height,
			width:
				textureOptions?.width ?? displayObject.getLocalBounds().width,
			resolution: textureOptions?.resolution ?? 1,
			scaleMode: SCALE_MODES.LINEAR,
			multisample,
			...textureOptions,
		});
		console.log('baseRenderTexture :', baseRenderTexture);
		overrideRenderTexture = new RenderTexture(baseRenderTexture);
		console.log('overrideRenderTexture :', overrideRenderTexture);
	}

	const finalTexture = (overrideRenderTexture ??
		renderTexture) as RenderTexture;

	let initialMultiSample = MSAA_QUALITY.NONE;

	if (renderer instanceof Renderer) {
		renderer.reset();
		initialMultiSample = finalTexture.framebuffer.multisample;
		finalTexture.framebuffer.multisample = finalTexture.multisample;
	}
	console.log('finalTexture :', finalTexture);

	renderer.render(displayObject, {
		renderTexture: finalTexture,
		clear: true,
	});

	if (renderer instanceof Renderer) {
		if (finalTexture.multisample !== MSAA_QUALITY.NONE) {
			renderer.framebuffer.blit();
		}

		finalTexture.framebuffer.multisample = initialMultiSample;
	}

	return finalTexture;
}
