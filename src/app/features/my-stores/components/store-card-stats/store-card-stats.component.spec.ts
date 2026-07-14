import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCardStatsComponent } from './store-card-stats.component';

describe('StoreCardStatsComponent', () => {
  let component: StoreCardStatsComponent;
  let fixture: ComponentFixture<StoreCardStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreCardStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreCardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
