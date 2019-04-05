import {Component, OnInit} from '@angular/core';
import {ControllerService} from '../../services/controller.service';
import {SwipesService} from '../../services/swipes.service';

@Component({
	selector: 'app-overlay',
	templateUrl: './overlay.component.html',
	styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

	public pointerdownHandler(event: any) {
		const { x, y } = event;
		this.swipesService.addMovementCoordinates({ x, y });
		this.swipesService.setMouseDownState(true);
	}

	public pointerupHandler(event: any) {
		const { x, y } = event;
		this.swipesService.addMovementCoordinates({ x, y });
		this.swipesService.setMouseDownState(false);
	}

	constructor(private controllerService: ControllerService,
				private swipesService: SwipesService) {
	}

	ngOnInit(): void {
	}
}
