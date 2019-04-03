import {ChangeDetectionStrategy, Component, HostListener, OnInit} from '@angular/core';
import {ControllerService} from '../../services/controller.service';
import {SwipesService} from '../../services/swipes.service';
import {Observable} from 'rxjs';
import {ICellProps} from '../../interfaces/cell-props.interface';

@Component({
	selector: 'app-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnInit {
	@HostListener('document:mousedown')
	private _mousedownHandler() {
		this.swipesService.setMouseDownState(true);
	}

	@HostListener('document:mouseup')
	private _mouseupHandler() {
		this.swipesService.setMouseDownState(false);
	}

	@HostListener('document:mousemove', ['$event'])
	private _mousemoveHandler(event: any) {
		const { clientX, clientY } = event;

		this.swipesService.addMovementCoordinates({ x: clientX, y: clientY });
	}

	constructor(private controllerService: ControllerService,
				private swipesService: SwipesService) {
	}

	public get cellProps(): Observable<ICellProps[]> {
		return this.controllerService.cells;
	}

	ngOnInit() {
		this.swipesService.swipes.subscribe(console.log);
	}

}
