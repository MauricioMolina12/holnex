import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdsSliderComponent } from './ads-slider.component';

describe('AdsSliderComponent', () => {
  let component: AdsSliderComponent;
  let fixture: ComponentFixture<AdsSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdsSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdsSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
