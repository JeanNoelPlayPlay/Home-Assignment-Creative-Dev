import { Application, Container, Graphics } from 'pixi.js';
import seedrandom from 'seedrandom';
import { Rectangle } from '../../utils/generateGraphics';
import { getRandomRandom } from '../../utils/utils';

export class Background extends Container {
	gridsize: number;
	graphSizeX: number;
	graphSizeY: number;
	color: string;
	app: Application<HTMLCanvasElement>;
	randomNumber: seedrandom.PRNG;
	backgroundContainer: any;
	bgGraph: Graphics[];
	constructor(
		gridsize: number,
		graphSizeX: number,
		graphSizeY: number,
		color: string,
		app: Application<HTMLCanvasElement>,
		randomNumber: seedrandom.PRNG
	) {
		super();

		this.gridsize = gridsize;
		this.graphSizeX = graphSizeX;
		this.graphSizeY = graphSizeY;
		this.color = color;
		this.app = app;
		this.randomNumber = randomNumber;
		this.bgGraph = [];

		this.generate();
	}

	private generate() {
		for (let i = 0; i < this.gridsize; i++) {
			for (let j = 0; j < this.gridsize; j++) {
				const graph = new Rectangle(
					this.graphSizeX,
					this.graphSizeY,
					this.color
				);
				graph.x =
					0 +
					i * (this.app.screen.width / this.gridsize) +
					(this.app.screen.width / this.gridsize / 2) *
						this.randomNumber();
				graph.y =
					0 +
					j * (this.app.screen.height / this.gridsize) +
					(this.app.screen.height / this.gridsize / 2) *
						this.randomNumber();

				graph.rotation = getRandomRandom(0, Math.PI);

				this.bgGraph.push(graph);
				this.addChild(graph);
			}
		}
	}
}
