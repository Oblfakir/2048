import {ICellProps} from '../interfaces/cell-props.interface';
import {Swipes} from '../constants';

export class Helpers {
	public static getEmptyCell(X: number, Y: number): ICellProps {
		return { X, Y, isPresent: false };
	}

	public static getValueCell(X: number, Y: number, value: number): ICellProps {
		return { X, Y, value, isPresent: true};
	}

	public static checkRowForEqualNumbers(cells: ICellProps[]): ICellProps[][] {
		const result = [];
		const arr = [...cells];
		const usedCells = [];

		for (let i = 0; i < 4; i ++) {
			for (let j = i + 1; j < 4; j ++) {
				if (!arr[i].isPresent || !arr[j].isPresent) { continue; }
				if (arr[i].value !== arr[j].value) { continue; }
				if (usedCells.includes(arr[i]) || usedCells.includes(arr[j])) { continue; }

				let isGapEmpty = true;

				for (let k = i + 1; k < j; k ++) {
					if (cells[k].isPresent) {
						isGapEmpty = false;
					}
				}

				if (!isGapEmpty) { continue; }

				result.push([arr[i], arr[j]]);
				usedCells.push(arr[i]);
				usedCells.push(arr[j]);
			}
		}

		return result;
	}

	public static findPlaceForMerged(row: ICellProps[], cells: ICellProps[], swipe: Swipes): { X: number, Y: number } {
		switch (swipe) {
			case Swipes.RIGHT: {
				const { X, Y } = cells[cells.length - 1];
				const cellIndexes = cells.map(cell => row.indexOf(cell));
				const sortedCellIndexes = cellIndexes.sort().reverse();
				let result = { X, Y };

				for (let i = sortedCellIndexes[0] + 1; i < 4; i ++) {
					if (!row[i].isPresent) {
						const { X: newX, Y: newY } = row[i];
						result = { X: newX, Y: newY };
					}
				}

				return result;
			}
			case Swipes.LEFT: {
				const { X, Y } = cells[0];
				const cellIndexes = cells.map(cell => row.indexOf(cell));
				const sortedCellIndexes = cellIndexes.sort();
				let result = { X, Y };

				for (let i = sortedCellIndexes[0]; i >= 0; i --) {
					if (!row[i].isPresent) {
						const { X: newX, Y: newY } = row[i];
						result = { X: newX, Y: newY };
					}
				}

				return result;
			}
			case Swipes.UP: {
				break;
			}
			case Swipes.DOWN: {
				break;
			}
			default: return;
		}
		return {X: 0, Y: 0};
	}
}
