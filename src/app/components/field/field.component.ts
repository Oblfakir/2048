import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICellProps} from '../../interfaces/cell-props.interface';
import {IFieldState} from '../../interfaces/field-state.interface';

@Component({
	selector: 'app-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnInit {
	@Input() public fieldState: IFieldState;

	ngOnInit(): void {
	}
}
