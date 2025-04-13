import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSummaryShoppingComponent } from './card-summary-shopping.component';

describe('CardSummaryShoppingComponent', () => {
  let component: CardSummaryShoppingComponent;
  let fixture: ComponentFixture<CardSummaryShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSummaryShoppingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSummaryShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
