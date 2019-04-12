import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Swipes} from '../constants';
import {SwipesService} from './swipes.service';
import {IFieldState} from '../interfaces/field-state.interface';
import {Helpers} from './helpers';

@Injectable({
	providedIn: 'root'
})
export class ControllerService {
	private _fieldState: BehaviorSubject<IFieldState>;

	constructor(private swipesService: SwipesService) {
		const initialCells = [
			[
				Helpers.getEmptyCell(0, 0),
				Helpers.getEmptyCell(1, 0),
				Helpers.getEmptyCell(2, 0),
				Helpers.getEmptyCell(3, 0)
			],
			[
				Helpers.getValueCell(0, 1, 4),
				Helpers.getValueCell(1, 1, 4),
				Helpers.getValueCell(2, 1, 2),
				Helpers.getValueCell(3, 1, 2)
			],
			[
				Helpers.getEmptyCell(0, 2),
				Helpers.getEmptyCell(1, 2),
				Helpers.getEmptyCell(2, 2),
				Helpers.getEmptyCell(3, 2)
			],
			[
				Helpers.getEmptyCell(0, 3),
				Helpers.getEmptyCell(1, 3),
				Helpers.getValueCell(2, 3, 2),
				Helpers.getEmptyCell(3, 3)
			]
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

	private _subscribeToSwipes() {
		this.swipesService.swipes.subscribe((swipe: Swipes) => {
			switch (swipe) {
				case Swipes.RIGHT: {
					this._handleSwipeRight();
					break;
				}
				case Swipes.LEFT: {
					this._handleSwipeLeft();
					break;
				}
				case Swipes.UP: {
					this._handleSwipeUp();
					break;
				}
				case Swipes.DOWN: {
					this._handleSwipeDown();
					break;
				}
				default: return;
			}
		});
	}

	private _handleSwipeRight(): void {
		const fieldState = this._getFieldWithPreviousState();
		const { currentCells } = fieldState;

		Helpers.movePairs(fieldState, currentCells, Swipes.RIGHT);
		Helpers.moveSingles(fieldState, Swipes.RIGHT);

		const emptyCells = Helpers.getEmptyCells(currentCells);
		Helpers.addRandomCell(emptyCells);

		this._fieldState.next(fieldState);
	}

	private _handleSwipeLeft(): void {
		const fieldState = this._getFieldWithPreviousState();
		const { currentCells } = fieldState;

		Helpers.movePairs(fieldState, currentCells, Swipes.LEFT);
		Helpers.moveSingles(fieldState, Swipes.LEFT);

		const emptyCells = Helpers.getEmptyCells(currentCells);
		Helpers.addRandomCell(emptyCells);

		this._fieldState.next(fieldState);
	}

	private _handleSwipeUp(): void {
		const fieldState = this._getFieldWithPreviousState();
		const { currentCells } = fieldState;
		const rows = Helpers.getColumns(fieldState.currentCells);

		Helpers.movePairs(fieldState, rows, Swipes.UP);
		Helpers.moveSingles(fieldState, Swipes.UP);

		const emptyCells = Helpers.getEmptyCells(currentCells);
		Helpers.addRandomCell(emptyCells);

		this._fieldState.next(fieldState);
	}

	private _handleSwipeDown(): void {
		const fieldState = this._getFieldWithPreviousState();
		const { currentCells } = fieldState;
		const rows = Helpers.getColumns(fieldState.currentCells);

		Helpers.movePairs(fieldState, rows, Swipes.DOWN);
		Helpers.moveSingles(fieldState, Swipes.DOWN);

		const emptyCells = Helpers.getEmptyCells(currentCells);
		Helpers.addRandomCell(emptyCells);

		this._fieldState.next(fieldState);
	}

	private _getFieldWithPreviousState(): IFieldState {
		const fieldState = this._fieldState.getValue();
		fieldState.previousCells = JSON.parse(JSON.stringify(fieldState.currentCells));
		return fieldState;
	}
}

