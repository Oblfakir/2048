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
				Helpers.getEmptyCell(1, 1),
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
				Helpers.getEmptyCell(2, 3),
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

	private _getEmptyCells() {

	}

	private _addRandomCell() {

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

		for (let i = 0; i < 4; i ++) {
			const equals = Helpers.checkRowForEqualNumbers(currentCells[i]);

			equals.forEach(pair => {
				const { X, Y } = Helpers.findPlaceForMerged(currentCells[i], pair, Swipes.RIGHT);
				fieldState.currentCells[Y][X] = Helpers.getValueCell(X, Y, pair[0].value + pair[1].value);
				pair[0].value = undefined;
				pair[1].value = undefined;
				pair[0].isPresent = false;
				pair[1].isPresent = false;
			});
		}

		this._fieldState.next(fieldState);
	}

	private _handleSwipeLeft(): void {
		const fieldState = this._getFieldWithPreviousState();
		const { currentCells } = fieldState;

		for (let i = 0; i < 4; i ++) {
			const equals = Helpers.checkRowForEqualNumbers(currentCells[i]);

			equals.forEach(pair => {
				const { X, Y } = Helpers.findPlaceForMerged(currentCells[i], pair, Swipes.LEFT);
				fieldState.currentCells[Y][X] = Helpers.getValueCell(X, Y, pair[0].value + pair[1].value);
				pair[0].value = undefined;
				pair[1].value = undefined;
				pair[0].isPresent = false;
				pair[1].isPresent = false;
			});
		}

		this._fieldState.next(fieldState);
	}

	private _handleSwipeUp(): void {
		const fieldState = this._getFieldWithPreviousState();

		for (let i = 0; i < 4; i ++) {
			for (let j = 0; j < 4; j ++) {

			}
		}

		this._fieldState.next(fieldState);
	}

	private _handleSwipeDown(): void {
		const fieldState = this._getFieldWithPreviousState();

		for (let i = 0; i < 4; i ++) {
			for (let j = 0; j < 4; j ++) {

			}
		}

		this._fieldState.next(fieldState);
	}

	private _getFieldWithPreviousState(): IFieldState {
		const fieldState = this._fieldState.getValue();
		fieldState.previousCells = JSON.parse(JSON.stringify(fieldState.currentCells));
		fieldState.currentCells = JSON.parse(JSON.stringify(fieldState.currentCells));
		return fieldState;
	}
}

