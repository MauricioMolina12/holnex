import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { loadProductBySlug } from '../../store/actions/product.actions';
import { Renderer2 } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { SeoService } from '../../../../core/services/seo.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let storeSpy: jasmine.SpyObj<any>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['slug', 'test-product']])) } },
        { provide: Renderer2, useValue: {} },
        { provide: ProductsService, useValue: {} },
        { provide: SeoService, useValue: { setMetaData: () => {}, default: () => {} } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: Store, useValue: storeSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;

    storeSpy.select.and.returnValue(of(null)); // Simulamos que no hay producto aún

    fixture.detectChanges(); // ngOnInit se ejecuta
  });

  it('debería obtener el slug de la ruta y despachar loadProductBySlug', () => {
    expect(component.slug).toBe('test-product');
    expect(storeSpy.dispatch).toHaveBeenCalledWith(loadProductBySlug({ slug: 'test-product' }));
  });
});
