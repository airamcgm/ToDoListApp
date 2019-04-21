import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';

const routes: Routes = [
//  { path: '', pathMatch: 'full', redirectTo: 'board-list' }, 
//  { path: 'board-list', component: MainNavComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
