import {HostListener, Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Swipes} from '../constants';

@Injectable({
	providedIn: 'root'
})
export class SwipesService {
	private _swipes: Subject<Swipes> = new Subject<Swipes>();
	private _isMouseDown: boolean;
	private _coordinates: { x: number, y: number }[] = [];

	@HostListener('document:mousedown')
	private _mousedownHandler() {
		this._isMouseDown = true;
	}

	@HostListener('document:mouseup')
	private _mouseupHandler() {
		this._isMouseDown = false;
		this._calculateSwipe();
	}

	@HostListener('document:mousemove', ['$event'])
	private _mousemoveHandler(event: any) {
		const { clientX, clientY } = event;

		this._coordinates.push({ x: clientX, y: clientY });
	}

	public get swipes(): Observable<Swipes> {
		return this._swipes.asObservable();
	}

	private _calculateSwipe(): void {
		if (this._coordinates.length > 2) {
			const { x: startX, y: startY } = this._coordinates[0];
			const { x: endX, y: endY } = this._coordinates[this._coordinates.length - 1];
			const deltaX = endX - startX;
			const deltaY = endY - startY;

			if (Math.abs(deltaX) > 20 || Math.abs(deltaY) > 20) {
				const angle = - Math.atan2(deltaY, deltaX) * 180 / Math.PI;

				switch (true) {
					case (angle >= -180 && angle <= -135) || (angle <= 180 && angle >= 135): {
						this._swipes.next(Swipes.RIGHT);
						break;
					}
					case angle >= 45 && angle <= 135: {
						this._swipes.next(Swipes.UP);
						break;
					}
					case (angle >= 0 && angle <= 45) || (angle <= 0 && angle >= -45): {
						this._swipes.next(Swipes.LEFT);
						break;
					}
					case angle >= -135 && angle <= -45: {
						this._swipes.next(Swipes.DOWN);
						break;
					}
					default: break;
				}
			}

			this._coordinates = [];
		}
	}
}
