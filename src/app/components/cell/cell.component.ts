import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {ICellProps} from '../../interfaces/cell-props.interface';

@Component({
	selector: 'app-cell',
	templateUrl: './cell.component.html',
	styleUrls: ['./cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {
	@Input() public props: ICellProps;

	public get top(): string {
		return this.props ? `${this.props.Y * 100}px` : '0';
	}

	public get left(): string {
		return this.props ? `${this.props.X * 100}px` : '0';
	}
}
