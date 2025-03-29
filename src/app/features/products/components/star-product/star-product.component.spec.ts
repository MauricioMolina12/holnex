import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarProductComponent } from './star-product.component';

describe('StarProductComponent', () => {
  let component: StarProductComponent;
  let fixture: ComponentFixture<StarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
