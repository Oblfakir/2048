import {ChangeDetectionStrategy, Component, Input, ChangeDetectorRef} from '@angular/core';
import {CellColors} from '../../constants/cell-colors';

@Component({
	selector: 'app-cell',
	templateUrl: './cell.component.html',
	styleUrls: ['./cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {
	public value: number;
	public X: number;
	public Y: number;

	public get top(): string {
		return `${this.Y * 70}px`;
	}

	public get left(): string {
		return `${this.X * 70}px`;
	}

	public get color(): string {
		return CellColors[this.value];
	}
}
