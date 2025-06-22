import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProfileSellerComponent } from './card-profile-seller.component';

describe('CardProfileSellerComponent', () => {
  let component: CardProfileSellerComponent;
  let fixture: ComponentFixture<CardProfileSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardProfileSellerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProfileSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
