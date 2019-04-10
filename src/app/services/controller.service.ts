import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Swipes} from '../constants';
import {SwipesService} from './swipes.service';
import {IFieldState} from '../interfaces/field-state.interface';
import {ICellProps} from '../interfaces/cell-props.interface';

@Injectable({
	providedIn: 'root'
})
export class ControllerService {
	private _fieldState: BehaviorSubject<IFieldState>;

	constructor(private swipesService: SwipesService) {
		const initialCells = [
			[this._getEmptyCell(), this._getEmptyCell(), this._getEmptyCell(), this._getEmptyCell()],
			[this._getValueCell(0, 1, 4), this._getEmptyCell(), this._getValueCell(2, 1, 2), this._getValueCell(3, 1, 2)],
			[this._getEmptyCell(), this._getEmptyCell(), this._getEmptyCell(), this._getEmptyCell()],
			[this._getEmptyCell(), this._getEmptyCell(), this._getEmptyCell(), this._getEmptyCell()]
		];
		const initialState = {
			previousCells: JSON.parse(JSON.stringify(initialCells)),
			currentCells: JSON.parse(JSON.stringify(initialCells))
		};
		this._fieldState = new BehaviorSubject<IFieldState>(initialState);
		this._subscribeToSwipes();
	}

	public get fieldState(): Observable<IFieldState> {
		return this._fieldState.asObservable();
	}

	private _getEmptyCells() {

	}

	private _addRandomCell() {

	}

	private _getEmptyCell(): ICellProps {
		return { X: 0, Y: 0, isPresent: false };
	}

	private _getValueCell(X: number, Y: number, value: number): ICellProps {
		return { X, Y, value, isPresent: true};
	}

	private _subscribeToSwipes() {
		this.swipesService.swipes.subscribe((swipe: Swipes) => {
			const fieldState = this._fieldState.getValue();
			const currentCells = JSON.parse(JSON.stringify(fieldState.currentCells));

			fieldState.previousCells = currentCells;

			switch (swipe) {
				case Swipes.RIGHT: {
					fieldState.currentCells = currentCells.map(cellsArr => {
						return cellsArr.map(cell => ({...cell, X: cell.X - 1}));
					});
					break;
				}
				case Swipes.LEFT: {
					fieldState.currentCells = currentCells.map(cellsArr => {
						return cellsArr.map(cell => ({...cell, X: cell.X + 1}));
					});
					break;
				}
				case Swipes.UP: {
					fieldState.currentCells = currentCells.map(cellsArr => {
						return cellsArr.map(cell => ({...cell, Y: cell.Y - 1}));
					});
					break;
				}
				case Swipes.DOWN: {
					fieldState.currentCells = currentCells.map(cellsArr => {
						return cellsArr.map(cell => ({...cell, Y: cell.Y + 1}));
					});
					break;
				}
				default: return;
			}

			this._fieldState.next(fieldState);
		});
	}
}
