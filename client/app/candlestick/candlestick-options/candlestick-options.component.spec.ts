import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandlestickOptionsComponent } from './candlestick-options.component';

describe('CandlestickOptionsComponent', () => {
  let component: CandlestickOptionsComponent;
  let fixture: ComponentFixture<CandlestickOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandlestickOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandlestickOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
