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
      title: 'Oferta en productos de mercado',
      description: 'Explora nuestra nueva variedad con hasta 50% de descuento.',
      imageUrl: 'https://www.semana.com/resizer/v2/WJL7H67ESFABZB5QKCCKY7MXEQ.jpg?auth=7e2cff5d4e9bf145b25428a560adcc05472908e34769323eec7c1fddb220e4ec&smart=true&quality=75&width=1920&height=1080'
    },
    {
      title: 'Accesorios que enamoran',
      description: 'Descubre joyas y bolsos exclusivos para complementar tu estilo.',
      imageUrl: 'https://img.freepik.com/foto-gratis/marco-blanco-flores-blancas-zapatos-mujer-cosmeticos_23-2148055239.jpg?semt=ais_hybrid&w=740'
    },
    {
      title: 'Descuentos en tecnología',
      description: 'Aprovecha las promociones en gadgets y dispositivos inteligentes.',
      imageUrl: 'https://www.cined.com/content/uploads/2020/05/Apple_2020_13-inch_MacBook_Pro_Header.jpg'
    },
    {
      title: 'Servicios para tu evento',
      description: 'Organizamos tu evento de principio a fin. Consulta nuestras promociones.',
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50b3xlbnwwfHwwfHx8MA%3D%3D'
    },
    {
      title: 'Sesiones de fotos exclusivas',
      description: 'Captura tu esencia con una sesión personalizada en estudio o exterior.',
      imageUrl: 'https://wallpapers.com/images/hd/photography-studio-background-zwixvboe50qm0ynx.jpg'
    }
  ];
  


}
