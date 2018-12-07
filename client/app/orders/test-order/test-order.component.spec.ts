import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestOrderComponent } from './test-order.component';

describe('TestOrderComponent', () => {
  let component: TestOrderComponent;
  let fixture: ComponentFixture<TestOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
