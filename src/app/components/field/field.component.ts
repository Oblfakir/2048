import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ICellProps} from '../../interfaces/cell-props.interface';
import {IFieldState} from '../../interfaces/field-state.interface';

@Component({
	selector: 'app-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit, OnChanges {
	@Input() public fieldState: IFieldState;
	public cells: ICellProps[][] = [[]];

	ngOnInit(): void {
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.fieldState) {
			if (changes.fieldState.firstChange) {
				this.cells = this.fieldState.currentCells;
			}
		}
	}
}
