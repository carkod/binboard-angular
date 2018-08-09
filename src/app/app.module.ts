import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CryptotableComponent } from './cryptotable/cryptotable.component';
import { ListingComponent } from './listing/listing.component';
import { HttpClientModule } from '@angular/common/http';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { CommonModule, DatePipe } from '@angular/common';
import { PlotlyModule } from 'angular-plotly.js';
import { ApiService } from './api.service';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RoutesRoutingModule } from './routes/routes-routing.module';
import { RoutesModule } from './routes/routes.module';
import { StockPickerComponent } from './stock-picker/stock-picker.component';
import { DrawerService } from './drawer.service';
import { ReactiveFormsModule, FormsModule } from '../../node_modules/@angular/forms';

// Angular router here
// - /Dashboard
// - /Listing
// - /Analysis

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
    PlotlyModule,
    HttpClientModule,
    RoutesRoutingModule,
    RoutesModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule
  ],
  providers: [CryptotableComponent, DatePipe, ApiService, DrawerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
