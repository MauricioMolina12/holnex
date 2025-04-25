import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStarComponent } from './product-star.component';

describe('ProductStarComponent', () => {
  let component: ProductStarComponent;
  let fixture: ComponentFixture<ProductStarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductStarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductStarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
