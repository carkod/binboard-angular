import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatAutocompleteModule, MatCheckboxModule, MatRadioModule, MatChipsModule, MatSnackBar, MatSnackBarModule, MatProgressSpinnerModule, MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ListingComponent } from './listing/listing.component';
import { HttpClientModule } from '@angular/common/http';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from './services/api.service';
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
import { TradesComponent } from './trades/trades.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { StatModelsComponent } from './stock-picker/stat-models/stat-models.component';
import { StatDataComponent } from './stock-picker/stat-data/stat-data.component';
import { OrdersComponent } from './orders/orders.component';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { ListingTableComponent } from './trades/listing-table/listing-table.component';
import { BuyComponent } from './orders/buy/buy.component';

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
    TradesComponent,
    GlobalSettingsComponent,
    StatModelsComponent,
    StatDataComponent,
    OrdersComponent,
    ListingTableComponent,
    BuyComponent,

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
    MatTabsModule
  ],
  providers: [
    DatePipe,
    ApiService,
    DrawerService,
    StreamsService,
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
