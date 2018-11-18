import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'listing-table',
  templateUrl: './listing-table.component.html',
  styleUrls: ['./listing-table.component.scss']
})
export class ListingTableComponent implements OnInit, OnChanges {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() data: Array<any>;
  @Input() displayedColumns: any;
  isLoadingResults = false;
  
  constructor() { }

  ngOnInit() {
    this.isLoadingResults = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && !changes.data.firstChange) {
      const { currentValue } = changes.data;
      this.isLoadingResults = false;
      this.data = currentValue;
      
    }
  }

}
