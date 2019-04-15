import {
	Component,
	ViewChild,
	ViewContainerRef,
	ComponentFactoryResolver,
	ComponentRef,
	OnInit,
	OnDestroy
} from '@angular/core';
import {IFieldState} from '../../interfaces/field-state.interface';
import {CellComponent} from '../cell/cell.component';
import {ControllerService} from '../../services/controller.service';
import {Subscription} from 'rxjs';

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
			this._drawPreviousState(fieldState);
			this._animateField(fieldState, this._calculateEndPositions(fieldState));
		});
	}

	private _drawPreviousState(fieldState: IFieldState): void {
		this._currentCells.forEach(row => row.forEach(cell => cell.destroy()));

		const factory = this.componentFactoryResolver.resolveComponentFactory(CellComponent);

		fieldState.currentCells.forEach(row => {
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

	private _calculateEndPositions(fieldState: IFieldState): { X: number, Y: number }[] {
		return [];
	}

	private _animateField(fieldState: IFieldState, endPositions: { X: number, Y: number }[]): void {

	}

	ngOnDestroy(): void {
		if (this._sub) {
			this._sub.unsubscribe();
		}
	}
}
