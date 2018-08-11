import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSuggesterComponent } from './coin-suggester.component';

describe('CoinSuggesterComponent', () => {
  let component: CoinSuggesterComponent;
  let fixture: ComponentFixture<CoinSuggesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinSuggesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSuggesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
