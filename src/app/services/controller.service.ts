import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Swipes } from '../constants';
import { SwipesService } from './swipes.service';
import { IFieldState } from '../interfaces/field-state.interface';
import { Helpers } from './helpers';

@Injectable({
	providedIn: 'root'
})
export class ControllerService {
	private _fieldState: BehaviorSubject<IFieldState>;

	constructor(private swipesService: SwipesService) {
		this._fieldState = new BehaviorSubject<IFieldState>(Helpers.getInitialState());
		this._subscribeToSwipes();
	}

	public get fieldState(): Observable<IFieldState> {
		return this._fieldState.asObservable();
	}

	private _subscribeToSwipes() {
		this.swipesService.swipes.subscribe((swipe: Swipes) => {
			const fieldState = this._getFieldWithPreviousState();
			const { currentCells } = fieldState;
			const rows = swipe === Swipes.UP || swipe === Swipes.DOWN
				? Helpers.getColumns(fieldState.currentCells)
				: currentCells;

			Helpers.movePairs(fieldState, rows, swipe);
			Helpers.moveSingles(fieldState, swipe);

			if (Helpers.checkForChanges(fieldState)) {
				Helpers.addRandomCell(Helpers.getEmptyCells(currentCells));
				fieldState.swipe = swipe;
				this._fieldState.next(fieldState);
			}
		});
	}

	private _getFieldWithPreviousState(): IFieldState {
		const fieldState = this._fieldState.getValue();
		fieldState.previousCells = JSON.parse(JSON.stringify(fieldState.currentCells));
		return fieldState;
	}
}

