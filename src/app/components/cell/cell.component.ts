import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
	selector: 'app-cell',
	templateUrl: './cell.component.html',
	styleUrls: ['./cell.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CellComponent {
	@Input() public value: number;
	@Input() public X: number;
	@Input() public Y: number;

	public get top(): string {
		return `${this.Y * 70}px`;
	}

	public get left(): string {
		return `${this.X * 70}px`;
	}
}
