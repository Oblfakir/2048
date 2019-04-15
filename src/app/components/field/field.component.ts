import {Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {IFieldState} from '../../interfaces/field-state.interface';
import {CellComponent} from '../cell/cell.component';
import {ControllerService} from '../../services/controller.service';
import {Subscription} from 'rxjs';
import {Swipes} from '../../constants';
import {ICellProps} from '../../interfaces/cell-props.interface';

@Component({
	selector: 'app-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnDestroy {
	@ViewChild('field', {read: ViewContainerRef}) field: ViewContainerRef;
	private _currentCells: ComponentRef<CellComponent>[][] = [];
	private _sub: Subscription;

	constructor(private componentFactoryResolver: ComponentFactoryResolver,
				private controllerService: ControllerService) {
	}

	ngOnInit(): void {
		this.controllerService.fieldState.subscribe((fieldState: IFieldState) => {
			this._drawState(fieldState.previousCells);
			this._animateField(fieldState, this._calculateEndPositions(fieldState)).then(() => {
				this._drawState(fieldState.currentCells);
			});
		});
	}

	private _drawState(cells: ICellProps[][]): void {
		this._currentCells.forEach(row => row.forEach(cell => cell.destroy()));

		const factory = this.componentFactoryResolver.resolveComponentFactory(CellComponent);

		cells.forEach(row => {
			const subarr = [];

			row.forEach(cell => {
				const component = this.field.createComponent(factory);

				(<CellComponent>component.instance).X = cell.X;
				(<CellComponent>component.instance).Y = cell.Y;
				(<CellComponent>component.instance).value = cell.value;

				subarr.push(component);
				component.changeDetectorRef.detectChanges();
			});

			this._currentCells.push(subarr);
		});
	}

	private _calculateEndPositions(fieldState: IFieldState): {[key: string]: { X: number, Y: number }} {
		const result: {[key: string]: { X: number, Y: number }} = {};

		switch (fieldState.swipe) {
			case Swipes.LEFT: {
				for (let i = 0; i < 4; i++) {
					for (let j = 3; j >= 0; j --) {
						if (fieldState.currentCells[i][j].isPresent && !result[i]) {
							const { X, Y } = fieldState.currentCells[i][j];
							result[i] = { X, Y };
						}
					}
				}
				return result;
			}
			case Swipes.RIGHT: {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j ++) {
						if (fieldState.currentCells[i][j].isPresent && !result[i]) {
							const { X, Y } = fieldState.currentCells[i][j];
							result[i] = { X, Y };
						}
					}
				}
				return result;
			}
			case Swipes.DOWN: {
				for (let i = 0; i < 4; i++) {
					for (let j = 0; j < 4; j ++) {
						if (fieldState.currentCells[j][i].isPresent && !result[j]) {
							const { X, Y } = fieldState.currentCells[j][i];
							result[j] = { X, Y };
						}
					}
				}
				return result;
			}
			case Swipes.UP: {
				for (let i = 0; i < 4; i++) {
					for (let j = 3; j >= 0; j --) {
						if (fieldState.currentCells[j][i].isPresent && !result[j]) {
							const { X, Y } = fieldState.currentCells[j][i];
							result[j] = { X, Y };
						}
					}
				}
				return result;
			}
		}
	}

	private _animateField(fieldState: IFieldState, endPositions: any): Promise<void> {
		return new Promise<void>((res, rej) => { res(); });
	}

	ngOnDestroy(): void {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}
}
