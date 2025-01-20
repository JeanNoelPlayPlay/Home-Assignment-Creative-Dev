import { BlurFilter, NoiseFilter } from 'pixi.js';

export const noise = new NoiseFilter(0.1, Math.random());
export const blur = new BlurFilter(0.1, 4);
