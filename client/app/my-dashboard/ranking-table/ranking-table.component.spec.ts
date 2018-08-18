
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingTableComponent } from './ranking-table.component';

describe('RankingTableComponent', () => {
  let component: RankingTableComponent;
  let fixture: ComponentFixture<RankingTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
