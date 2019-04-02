import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {ICellProps} from '../../interfaces/cell-props.interface';

@Component({
	selector: 'app-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldComponent implements OnInit {
	@Input() public cellProps: ICellProps[];

	ngOnInit(): void {
	}
}
