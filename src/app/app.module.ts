import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {CellComponent} from './components/cell/cell.component';
import {FieldComponent} from './components/field/field.component';
import {WrapperComponent} from './components/wrapper/wrapper.component';

@NgModule({
	declarations: [
		AppComponent,
		CellComponent,
		FieldComponent,
		WrapperComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
