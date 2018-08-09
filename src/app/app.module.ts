import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyDashboardComponent } from './my-dashboard/my-dashboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CryptotableComponent } from './cryptotable/cryptotable.component';
import { ListingComponent } from './listing/listing.component';
import { HttpClientModule } from '@angular/common/http';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ApiService } from './api.service';

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
    HttpClientModule
  ],
  providers: [CryptotableComponent, DatePipe, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
