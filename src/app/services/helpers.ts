import {ICellProps} from '../interfaces/cell-props.interface';
import {Swipes} from '../constants';
import {IFieldState} from '../interfaces/field-state.interface';

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
			case Swipes.LEFT:
			case Swipes.UP: {
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
			case Swipes.RIGHT:
			case Swipes.DOWN: {
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
			default: return;
		}
	}

	public static getColumns(cells: ICellProps[][]): ICellProps[][] {
		const rows = [];

		for (let i = 0; i < 4; i ++) {
			const row = [];

			for (let j = 0; j < 4; j ++) {
				row.push(cells[j][i]);
			}

			rows.push(row);
		}

		return rows;
	}

	public static movePairs(fieldState: IFieldState, cells: ICellProps[][], swipe: Swipes): IFieldState {
		for (let i = 0; i < 4; i ++) {
			const equals = Helpers.checkRowForEqualNumbers(cells[i]);

			equals.forEach((pair: ICellProps[]) => {
				const { X, Y } = Helpers.findPlaceForMerged(cells[i], pair, swipe);
				fieldState.currentCells[Y][X] = Helpers.getValueCell(X, Y, pair[0].value + pair[1].value);
				pair[0].value = undefined;
				pair[1].value = undefined;
				pair[0].isPresent = false;
				pair[1].isPresent = false;
			});
		}

		return fieldState;
	}

	public static moveSingles(fieldState: IFieldState, swipe: Swipes): IFieldState {
		let columns;

		if (swipe === Swipes.UP || swipe === Swipes.DOWN) {
			columns = Helpers.getColumns(fieldState.currentCells);
		}

		for (let i = 0; i < 4; i ++) {
			switch (swipe) {
				case Swipes.LEFT: {
					const row = fieldState.currentCells[i];
					const valuedCells = row.filter(x => x.isPresent).map(x => ({ value: x.value, isPresent: x.isPresent }));
					row.forEach(cell => { cell.isPresent = false; cell.value = undefined; });

					valuedCells.forEach((x, index) => {
						row[index].value = x.value;
						row[index].isPresent = true;
					});

					break;
				}
				case Swipes.UP: {
					const column = columns[i];
					const valuedCells = column.filter(x => x.isPresent).map(x => ({ value: x.value, isPresent: x.isPresent }));
					column.forEach(cell => { cell.isPresent = false; cell.value = undefined; });

					valuedCells.forEach((x, index) => {
						column[index].value = x.value;
						column[index].isPresent = true;
					});

					break;
				}
				case Swipes.RIGHT: {
					const row = fieldState.currentCells[i];
					const valuedCells = row.filter(x => x.isPresent).map(x => ({ value: x.value, isPresent: x.isPresent }));
					row.forEach(cell => { cell.isPresent = false; cell.value = undefined; });

					valuedCells.reverse().forEach((x, index) => {
						row[3 - index].value = x.value;
						row[3 - index].isPresent = true;
					});

					break;
				}
				case Swipes.DOWN: {
					const column = columns[i];
					const valuedCells = column.filter(x => x.isPresent).map(x => ({ value: x.value, isPresent: x.isPresent }));
					column.forEach(cell => { cell.isPresent = false; cell.value = undefined; });

					valuedCells.reverse().forEach((x, index) => {
						column[3 - index].value = x.value;
						column[3 - index].isPresent = true;
					});
					break;
				}
				default: return fieldState;
			}
		}

		return fieldState;
	}

	public static getEmptyCells() {

	}

	public static addRandomCell() {

	}
}
