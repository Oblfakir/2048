import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
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
