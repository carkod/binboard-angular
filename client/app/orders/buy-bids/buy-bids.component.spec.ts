
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyBidsComponent } from './buy-bids.component';

describe('BuyBidsComponent', () => {
  let component: BuyBidsComponent;
  let fixture: ComponentFixture<BuyBidsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyBidsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
