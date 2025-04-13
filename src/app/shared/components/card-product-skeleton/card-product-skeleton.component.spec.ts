import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductSkeletonComponent } from './card-product-skeleton.component';

describe('CardProductSkeletonComponent', () => {
  let component: CardProductSkeletonComponent;
  let fixture: ComponentFixture<CardProductSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardProductSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardProductSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
