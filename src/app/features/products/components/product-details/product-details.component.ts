import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  OnInit,
  QueryList,
  Renderer2,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  selectAllProducts,
  selectError,
  selectLoading,
} from '../../store/selectors/product.selectors';
import { loadProducts } from '../../store/actions/product.actions';
import { Product } from '../../models/products.model';
@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  // Inputs
  product!: any;
  @ViewChildren('imagesProducts') imagesProducts!: QueryList<ElementRef>;

  // Variables
  segmentIndicator: number = 1;
  showFullText: boolean = false;
  visibleComments: string[] = [];
  slug!: string;
  quantityProduct: number = 1;
  relatedProducts: any;
  mainImage: string = '';

  loading: boolean = true;
  // loadingInformation: boolean = true;
  // loadingSummary: boolean = true;

  // List
  buttons_options_product = [
    {
      title: 'Comprar ahora',
      cssClass: 'product-buy-now-button',
    },
    {
      title: 'Agregar al carrito',
      iconUrl: 'assets/img/icons/svg/shopcart/shopcart-outline-blue-light.svg',
      cssClass: 'product-add-shop-cart-button',
    },
    {
      title: 'Compartir',
    },
  ];

  buttons_options_seller = [
    {
      title: 'Visitar perfil',
      cssClass: 'visit-profile',
    },
    {
      title: 'Seguir',
    },
  ];

  colors = [
    { title: 'blue', colorHex: '#2292A4' },
    { title: 'gray', colorHex: '#545453' },
    { title: 'white', colorHex: '#D9D9D9' },
  ];
  comments: string[] = [
    'Excelente producto, muy recomendado!',
    'La calidad es buena, pero tardó en llegar.',
    'Súper cómodo y útil, me encantó!',
    'No era lo que esperaba, pero está decente.',
    'El servicio al cliente es excelente!',
    'Volvería a comprar sin dudarlo.',
    'Buena relación calidad-precio.',
  ];

  productsSignal = toSignal(this.store.select(selectAllProducts), {
    initialValue: [],
  });
  loadingSignal = toSignal(this.store.select(selectLoading), {
    initialValue: false,
  });
  errorSignal = toSignal(this.store.select(selectError), {
    initialValue: null,
  });

  private route = inject(ActivatedRoute);
  constructor(
    public productService: ProductsService,
    private renderer: Renderer2,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.loading = true;
      this.slug = params.get('slug') || '';

      this.getProductById(this.slug);
      this.product = computed(() => this.productService.productDetail$());
      this.store.dispatch(loadProducts());
    });
  }

  readonly setProduct = effect(() => {
    const product = this.product();
    if (product && product.images?.length) {
      this.mainImage = product.images[0];
      this.loading = false;
    }
  });

  getProductById(slug: string) {
    this.productService.getProductById(slug);
  }

  segment(type: number) {
    type == 1 ? (this.segmentIndicator = 1) : (this.segmentIndicator = 2);
  }

  toggleText() {
    this.showFullText = !this.showFullText;
  }

  uploadQuantity(typeButton: 'upload' | 'down') {
    switch (typeButton) {
      case 'upload':
        this.quantityProduct++;
        break;
      case 'down':
        if (this.quantityProduct > 0) {
          this.quantityProduct--;
        }
        break;
    }
  }

  changeMainImage(index: number, images: any[], event: Event) {
    if (images.length) {
      this.mainImage = images[index];

      this.imagesProducts.forEach((item) => {
        this.renderer.removeClass(item.nativeElement, 'selected');
      });

      let htmlElement = event.target as HTMLElement;
      this.renderer.addClass(htmlElement, 'selected');
    }
  }
}
