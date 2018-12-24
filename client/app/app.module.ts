import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatAutocompleteModule, MatCheckboxModule, MatRadioModule, MatChipsModule, MatSnackBar, MatSnackBarModule, MatProgressSpinnerModule, MatTabsModule, MatSelectModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ListingComponent } from './listing/listing.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { CommonModule, DatePipe } from '@angular/common';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutesRoutingModule } from './routes/routes-routing.module';
import { RoutesModule } from './routes/routes.module';
import { StockPickerComponent } from './stock-picker/stock-picker.component';
import { DrawerService } from './services/drawer.service';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';
import { AddNewComponent } from './stock-picker/add-new/add-new.component';
import { CoinSuggesterComponent } from './stock-picker/coin-suggester/coin-suggester.component';
import { CryptotableComponent } from './stock-picker/cryptotable/cryptotable.component';
import { DetailComponent } from './stock-picker/detail/detail.component';
import { RankingTableComponent } from './my-dashboard/ranking-table/ranking-table.component';
import { StreamsService } from './services/streams.service';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { StatModelsComponent } from './stock-picker/stat-models/stat-models.component';
import { StatDataComponent } from './stock-picker/stat-data/stat-data.component';
import { OrdersComponent } from './orders/orders.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { BuyComponent } from './orders/buy/buy.component';
import { BinanceErrorsService } from './services/binance-errors.service';
import { BidaskTableComponent } from './orders/bidask-table/bidask-table.component';
import { SellComponent } from './orders/sell/sell.component';
import { OpenOrdersComponent } from './orders/open-orders/open-orders.component';
import { GlobalComponent } from './global-settings/global/global.component';
import { RoundDecimalsPipe } from './pipes/round-decimals.pipe';
import { UsersComponent } from './users/users.component';
import { TestOrderComponent } from './orders/test-order/test-order.component';
import { FundsComponent } from './orders/funds/funds.component';
import { ListingTableComponent } from './orders/funds/listing-table/listing-table.component';
import { TradeHistoryComponent } from './orders/trade-history/trade-history.component';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';
import { RankingsComponent } from './rankings/rankings.component';
import { StrategiesComponent } from './strategies/strategies.component';
import { AppLoadService } from './services/app-load-service.service';
import { BalanceService } from './services/balance.service';

// Execute this before app init
export function getSettings(appLoadService: AppLoadService) {
  return () => appLoadService.getSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    MyDashboardComponent,
    SidebarComponent,
    CryptotableComponent,
    ListingComponent,
    CandlestickComponent,
    TopToolbarComponent,
    NotFoundComponent,
    StockPickerComponent,
    AddNewComponent,
    CoinSuggesterComponent,
    DetailComponent,
    RankingTableComponent,
    FundsComponent,
    GlobalSettingsComponent,
    StatModelsComponent,
    StatDataComponent,
    OrdersComponent,
    ListingTableComponent,
    BuyComponent,
    BidaskTableComponent,
    SellComponent,
    OpenOrdersComponent,
    GlobalComponent,
    RoundDecimalsPipe,
    UsersComponent,
    TestOrderComponent,
    OrderHistoryComponent,
    TradeHistoryComponent,
    RankingsComponent,
    StrategiesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    HttpClientModule,
    RoutesRoutingModule,
    RoutesModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatChipsModule,
    MatSnackBarModule,
    CdkTableModule,
    CdkTreeModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BinanceErrorsService, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
    { provide: APP_INITIALIZER, useFactory: getSettings, multi: true, deps: [ AppLoadService ] },
    DatePipe,
    DrawerService,
    StreamsService,
    MatSnackBar,
    AppLoadService,
    BalanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
