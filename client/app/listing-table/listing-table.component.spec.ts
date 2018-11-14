import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingTableComponent } from './listing-table.component';

describe('ListingTableComponent', () => {
  let component: ListingTableComponent;
  let fixture: ComponentFixture<ListingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
