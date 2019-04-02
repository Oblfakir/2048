import {ICellProps} from '../interfaces/cell-props.interface';

export enum Swipes {
	LEFT = 'LEFT',
	RIGHT = 'RIGHT',
	UP = 'UP',
	DOWN = 'DOWN'
}

export const initialCells: ICellProps[] = [
	{
		X: 0,
		Y: 1,
		value: 2
	}
];
