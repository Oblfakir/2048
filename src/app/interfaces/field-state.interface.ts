import { ICellProps } from './cell-props.interface';
import { Swipes } from '../constants';

export interface IFieldState {
	previousCells: ICellProps[][];
	currentCells: ICellProps[][];
	swipe?: Swipes;
}
