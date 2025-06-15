import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Ad } from '../../shared/models/ads';
import { ProductsService } from '../products/services/products.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectAllProducts,
  selectError,
  selectLoading,
} from '../products/store/selectors/product.selectors';

//Enum
import { ShowcaseTypeEnum } from '../../shared/components/highlight-showcase-component/highlight-showcase-type.enum';
import { sliderType } from '../../shared/components/products/products-slider/products-slider-type.enum';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  constructor(public productsService: ProductsService, private store: Store) {}

  async ngOnInit() {}

  // Enums for components
  ShowcaseTypeEnum = ShowcaseTypeEnum;

  sliderType = sliderType;

  // Signals for ads
  ads: Ad[] = [
    {
      title: 'Hay una oferta también para ti',
      description: 'Aprovecha y ahorra en esos artículos que estabas buscando.',
      imageUrl: 'https://i.ebayimg.com/images/g/PowAAOSwg8dn1EnL/s-l1600.webp',
    },
    {
      title: 'Devoluciones simplificadas',
      description: '¿No estás feliz con tu compra? La devolución es fácil.',
      imageUrl: 'https://i.ebayimg.com/images/g/wIAAAOSwMcdnyH7z/s-l1600.webp',
    },
    {
      title: 'Recibe tu pedido o tu dinero',
      description:
        'Compra con confianza con Devolución de tu dinero de Holnex.',
      imageUrl: 'https://i.ebayimg.com/images/g/ucUAAOSwsV9nuKhe/s-l1600.webp',
    },
  ];

  // Signals for products
  productsSignal = toSignal(this.store.select(selectAllProducts), {
    initialValue: [],
  });
  loadingSignal = toSignal(this.store.select(selectLoading), {
    initialValue: false,
  });
  errorSignal = toSignal(this.store.select(selectError), {
    initialValue: null,
  });
}
