import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Input,
  OnDestroy,
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
import { SeoService } from '../../../../shared/services/seo.service';
@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  // Inputs
  product!: any;
  @ViewChildren('imagesProducts') imagesProducts!: QueryList<ElementRef>;

  // Variables
  segmentIndicator: number = 1;
  showFullText: boolean = false;
  visibleComments: string[] = [];
  slug: string = '';
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
      icon: 'icon-shop-cart',
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
    { name: 'blue', colorHex: '#2292A4' },
    { name: 'gray', colorHex: '#545453' },
    { name: 'white', colorHex: '#D9D9D9' },
  ];
  comments: { name: string; image: string; time: string; comment: string }[] = [
    {
      name: 'Juan Rodríguez',
      image: 'https://randomuser.me/api/portraits/men/10.jpg',
      time: '3 horas',
      comment: `Compré esta camiseta gráfica de montaña y estoy encantada con la calidad del material y la impresión. 
              La talla es perfecta y el diseño es justo lo que esperaba. Se ha convertido en una de mis favoritas para salir a caminar o para usar casualmente. 
              Además, llegó rápido y en buen estado. ¡Muy recomendable!`,
    },
    {
      name: 'María López',
      image: 'https://randomuser.me/api/portraits/women/12.jpg',
      time: '1 día',
      comment: `El diseño es muy atractivo y el tejido se siente cómodo, pero noté que después de unos lavados el color empezó a desvanecerse un poco. 
              Aún así, la camiseta sigue siendo funcional y la recomiendo para quienes buscan un estilo casual con un toque aventurero.`,
    },
    {
      name: 'Pedro Sánchez',
      image: 'https://randomuser.me/api/portraits/men/15.jpg',
      time: '2 días',
      comment: `La camiseta es increíblemente cómoda y el diseño gráfico es impresionante, mucho mejor de lo que esperaba en las fotos. 
              Sin embargo, me hubiera gustado que viniera con una guía más clara de tallas, ya que tuve que cambiarla por una talla más grande. 
              Aparte de eso, el envío fue rápido y el servicio al cliente muy atento.`,
    },
    {
      name: 'Ana Morales',
      image: 'https://randomuser.me/api/portraits/women/18.jpg',
      time: '5 días',
      comment:
        'El producto es tal como se muestra en la descripción, la atención al cliente también fue excelente.',
    },
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
    private seoService: SeoService,
    private renderer: Renderer2,
    private store: Store
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(async (params) => {
      this.loading = true;
      this.slug = params.get('slug') || '';

      this.getProductById(this.slug);
      this.product = await computed(() => this.productService.productDetail$());
      if (this.product) {
        this.seoService.setTitle('HOLNEX - ' + this.product()?.slug);
        this.seoService.setDescription(this.product()?.description);
        this.seoService.setKeywords('camiseta, ropa, horizon. algodón');
        this.store.dispatch(loadProducts());
      }
    });
  }

  ngOnDestroy(): void {
    this.seoService.setTitle('');
    this.seoService.setDescription('');
    this.seoService.setKeywords('');
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
