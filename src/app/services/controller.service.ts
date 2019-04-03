import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ICellProps} from '../interfaces/cell-props.interface';
import {initialCells, Swipes} from '../constants';
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

	private _getEmptyCells() {

	}

	private _addRandomCell() {

	}

	private _getPossibleCellValues() {

	}

	private _subscribeToSwipes() {
		this.swipesService.swipes.subscribe((swipe: Swipes) => {
			const cell = this._cells.getValue()[0];

			switch (swipe) {
				case Swipes.RIGHT: {
					this._cells.next([{...cell, X: cell.X - 1}]);
					break;
				}
				case Swipes.LEFT: {
					this._cells.next([{...cell, X: cell.X + 1}]);
					break;
				}
				case Swipes.UP: {
					this._cells.next([{...cell, Y: cell.Y - 1}]);
					break;
				}
				case Swipes.DOWN: {
					this._cells.next([{...cell, Y: cell.Y + 1}]);
					break;
				}
				default:
					break;
			}
		});
	}
}
