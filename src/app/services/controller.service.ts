import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICellProps} from '../interfaces/cell-props.interface';
import {initialCells} from '../constants';
import {SwipesService} from './swipes.service';

@Injectable({
	providedIn: 'root'
})
export class ControllerService {
	private _cells: BehaviorSubject<ICellProps[]> = new BehaviorSubject<ICellProps[]>(initialCells);

	constructor(private swipesService: SwipesService) {
		this._subscribeToSwipes();
	}

	public get cells(): Observable<ICellProps[]> {
		return this._cells.asObservable();
	}

	_getEmptyCells() {

	}

	_addRandomCell() {

	}

	_getPossibleCellValues() {

	}

	_subscribeToSwipes() {
		// this.eventSource.swipes.subscribe((swipe) => {
		// 	switch (swipe) {
		// 		case Swipes.RIGHT: {
		// 			const cell = this.cells.currentValue[0];
		// 			this.cells.fireEvent([{...cell, posX: cell.posX - 1}]);
		// 			break;
		// 		}
		// 		case Swipes.LEFT: {
		// 			const cell = this.cells.currentValue[0];
		// 			this.cells.fireEvent([{...cell, posX: cell.posX + 1}]);
		// 			break;
		// 		}
		// 		case Swipes.UP: {
		// 			const cell = this.cells.currentValue[0];
		// 			this.cells.fireEvent([{...cell, posY: cell.posY - 1}]);
		// 			break;
		// 		}
		// 		case Swipes.DOWN: {
		// 			const cell = this.cells.currentValue[0];
		// 			this.cells.fireEvent([{...cell, posY: cell.posY + 1}]);
		// 			break;
		// 		}
		// 		default: break;
		// 	}
		// });
	}
}
