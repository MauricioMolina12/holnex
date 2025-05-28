import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertNewPromotionsComponent } from './alert-new-promotions.component';

describe('AlertNewPromotionsComponent', () => {
  let component: AlertNewPromotionsComponent;
  let fixture: ComponentFixture<AlertNewPromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertNewPromotionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertNewPromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
