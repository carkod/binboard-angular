import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyDashboardComponent } from '../my-dashboard/my-dashboard.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { StockPickerComponent } from '../stock-picker/stock-picker.component';
import { DetailComponent } from '../stock-picker/detail/detail.component';
import { GlobalSettingsComponent } from '../global-settings/global-settings.component';
import { OrdersComponent } from '../orders/orders.component';
import { BuyComponent } from '../orders/buy/buy.component';
import { SellComponent } from '../orders/sell/sell.component';
import { OpenOrdersComponent } from '../orders/open-orders/open-orders.component';
import { FundsComponent } from '../orders/funds/funds.component';
import { OrderHistoryComponent } from '../orders/order-history/order-history.component';
import { TradeHistoryComponent } from '../orders/trade-history/trade-history.component';

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
    path: 'stock-picker/:symbol',
    component: DetailComponent,
    pathMatch: 'full',
    data: { pageTitle: 'Coin Analysis' }
  },
  {
    path: 'orders',
    component: OrdersComponent,
    // pathMatch: 'full',
    data: { pageTitle: 'Orders' }
  },
  {
    path: 'settings',
    component: GlobalSettingsComponent,
    pathMatch: 'full',
    data: { pageTitle: 'Application settings' }
  },
  {
    path: 'users',
    component: GlobalSettingsComponent,
    pathMatch: 'full',
    data: { pageTitle: 'Accounts management' }
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
