import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatModelsComponent } from './stat-models.component';

describe('StatModelsComponent', () => {
  let component: StatModelsComponent;
  let fixture: ComponentFixture<StatModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
