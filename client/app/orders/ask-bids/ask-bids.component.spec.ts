
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskBidsComponent } from './ask-bids.component';

describe('AskBidsComponent', () => {
  let component: AskBidsComponent;
  let fixture: ComponentFixture<AskBidsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AskBidsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AskBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
