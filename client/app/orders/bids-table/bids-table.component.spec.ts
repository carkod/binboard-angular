
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BidsTableComponent } from './bids-table.component';

describe('BidsTableComponent', () => {
  let component: BidsTableComponent;
  let fixture: ComponentFixture<BidsTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BidsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BidsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
