import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatDataComponent } from './stat-data.component';

describe('StatDataComponent', () => {
  let component: StatDataComponent;
  let fixture: ComponentFixture<StatDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
