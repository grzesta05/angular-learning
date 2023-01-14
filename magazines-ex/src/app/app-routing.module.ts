import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports routerimport { MagazineComponent } from './magazine/magazine.component';
import { MagazineComponent } from './magazine/magazine.component';
import { MagazinesListComponent } from './magazines-list/magazines-list.component';
import { NumbersListComponent } from './numbers-list/numbers-list.component';
import { NumbersMenuComponent } from './numbers-menu/numbers-menu.component';

const routes: Routes = [
  {
    path: ':magazine',
    component: MagazineComponent,
    children: [{ path: ':year', component: NumbersListComponent }],
  },
  { path: '**', pathMatch: 'full', component: MagazinesListComponent },
]; // sets up routes constant where you define your routes
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
