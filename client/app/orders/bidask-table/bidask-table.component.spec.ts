import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidaskTableComponent } from './bidask-table.component';

describe('BidaskTableComponent', () => {
  let component: BidaskTableComponent;
  let fixture: ComponentFixture<BidaskTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BidaskTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BidaskTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
