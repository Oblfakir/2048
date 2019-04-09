import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ControllerService} from '../../services/controller.service';
import {Observable} from 'rxjs';
import {IFieldState} from '../../interfaces/field-state.interface';

@Component({
	selector: 'app-wrapper',
	templateUrl: './wrapper.component.html',
	styleUrls: ['./wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WrapperComponent implements OnInit {
	constructor(private controllerService: ControllerService) {
	}

	public get fieldState(): Observable<IFieldState> {
		return this.controllerService.fieldState;
	}

	ngOnInit() {
	}
}
