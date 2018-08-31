import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDashboardComponent } from '../my-dashboard/my-dashboard.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StockPickerComponent } from '../stock-picker/stock-picker.component';
import { DetailComponent } from '../stock-picker/detail/detail.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MyDashboardComponent,
    data: { pageTitle: 'Dashboard' }
  },
  {
    path: 'stock-picker',
    component: StockPickerComponent,
    data: { pageTitle: 'Currencies currently tracked' }
  },
  {
    path: 'stock-picker/:id',
    component: DetailComponent,
    pathMatch: 'full',
    data: { pageTitle: 'Coin Analysis' }
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }