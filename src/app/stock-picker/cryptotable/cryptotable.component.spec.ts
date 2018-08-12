
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptotableComponent } from './cryptotable.component';

describe('CryptotableComponent', () => {
  let component: CryptotableComponent;
  let fixture: ComponentFixture<CryptotableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptotableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CryptotableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
