import {Component, Input, OnChanges, SimpleChanges, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {IFieldState} from '../../interfaces/field-state.interface';
import { CellComponent } from '../cell/cell.component';

@Component({
	selector: 'app-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnChanges {
	@Input() public fieldState: IFieldState;
	@ViewChild('field', { read: ViewContainerRef }) field: ViewContainerRef;
	private _currentCells: CellComponent[][] = [];

	constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.fieldState) {
			this._drawPreviousState(changes.fieldState.currentValue);

			if (!changes.fieldState.firstChange) {
				this._animateField(changes.fieldState.currentValue, this._calculateEndPositions(changes.fieldState.currentValue));
			}
		}
	}

	private _drawPreviousState(fieldState: IFieldState): void {
		const factory = this.componentFactoryResolver.resolveComponentFactory(CellComponent);


		const component = this.field.createComponent(factory);

		(<CellComponent> component).X
	}

	private _calculateEndPositions(fieldState: IFieldState): { X: number, Y: number }[] {
		return [];
	}

	private _animateField(fieldState: IFieldState, endPositions: { X: number, Y: number }[]): void {

	}
}
