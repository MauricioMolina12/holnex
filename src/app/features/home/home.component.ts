import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Ad } from '../../shared/models/ads';
import { ProductsService } from '../products/services/products.service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  selectAllProducts,
  selectError,
  selectLoading,
} from '../products/store/selectors/product.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  productsSignal = toSignal(this.store.select(selectAllProducts), {initialValue: [],});
  loadingSignal = toSignal(this.store.select(selectLoading), {initialValue: false,});
  errorSignal = toSignal(this.store.select(selectError), {initialValue: null,});


  constructor(public productsService: ProductsService, private store: Store) {}

  async ngOnInit() {
  }

  ads: Ad[] = [
    {
      title: 'Hay una oferta también para ti',
      description: 'Aprovecha y ahorra en esos artículos que estabas buscando.',
      imageUrl: 'https://i.ebayimg.com/images/g/PowAAOSwg8dn1EnL/s-l1600.webp'
    },
    {
      title: 'Devoluciones simplificadas',
      description: '¿No estás feliz con tu compra? La devolución es fácil.',
      imageUrl: 'https://i.ebayimg.com/images/g/wIAAAOSwMcdnyH7z/s-l1600.webp'
    },
    {
      title: 'Recibe tu pedido o tu dinero',
      description: 'Compra con confianza con Devolución de tu dinero de Holnex.',
      imageUrl: 'https://i.ebayimg.com/images/g/ucUAAOSwsV9nuKhe/s-l1600.webp'
    },
  ];
  


}
