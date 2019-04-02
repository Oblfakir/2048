import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {WrapperComponent} from './components/wrapper/wrapper.component';

const routes: Routes = [
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '/game'
	},
	{
		path: 'game',
		component: WrapperComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
