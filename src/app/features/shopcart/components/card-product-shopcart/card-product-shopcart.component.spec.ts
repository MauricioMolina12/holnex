import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductShopcartComponent } from './card-product-shopcart.component';

describe('CardProductShopcartComponent', () => {
  let component: CardProductShopcartComponent;
  let fixture: ComponentFixture<CardProductShopcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardProductShopcartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProductShopcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
