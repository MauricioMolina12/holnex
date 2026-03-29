import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  signal,
  ViewChildren,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import {
  selectAllProducts,
  selectError,
  selectLoading,
  selectProductDetail,
} from '../../store/selectors/product.selectors';
import { loadProductBySlug } from '../../store/actions/product.actions';
import { SeoService } from '../../../../core/services/seo.service';
import { skeletonType } from '../../../../core/components/skeleton/skeleton.type.enum';
import { Product } from '../../models/products.model';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { ShareComponent } from '../../../../shared/components/share/share.component';

interface shipping{
  label: string;
  value: string;
  icon: string;
}


@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  // Inputs
  product!: any;

  /*** DOM REFERENCES ***/
  @ViewChildren('imagesProducts') imagesProducts!: QueryList<ElementRef>;
  @ViewChildren('tabBtn') tabs!: QueryList<ElementRef<HTMLButtonElement>>;

  /*** STATES & VARIABLES ***/
  loading!: boolean;

  skeletonType = skeletonType;
  segmentIndicator = 1;
  indicatorWidth = 0;
  indicatorLeft = 0;
  
  showFullText: boolean = false;
  slug: string = '';
  
  quantityProduct: number = 1;
  
  mainImage: string = '';
  
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

  shipping: shipping[] = [
    { label: 'Descuento', value: '50%', icon: 'icon-percent_discount' },
    { label: 'Paquete', value: 'Paquete regular', icon: 'icon-box' },
    { label: 'Tiempo de entrega', value: '3-4 días hábiles', icon: 'icon-calendar' },
    { label: 'Tiempo estimado', value: '10 - 12 Octubre 2026', icon: 'icon-truck' },
  ];
  
  showFixedHeader = signal(false);
  isFavorite = signal(false);

  /*** STORE & SIGNALS ***/
  productsRelated = toSignal(this.store.select(selectAllProducts), {
    initialValue: [],
  });
  loadingProductsRelated = toSignal(this.store.select(selectLoading), {
    initialValue: false,
  });
  errorProductsRelated = toSignal(this.store.select(selectError), {
    initialValue: null,
  });

  productDetail = toSignal(this.store.select(selectProductDetail), {
    initialValue: null,
  });

  private route = inject(ActivatedRoute);
  constructor(
    public productService: ProductsService,
    private seoService: SeoService,
    private renderer: Renderer2,
    private store: Store,
    private router: Router,
    private modalService: ModalService
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;

    if (scrollY > vh) {
      this.showFixedHeader.set(true);
    } else {
      this.showFixedHeader.set(false);
    }
  }

  /*** HOOKS ***/

  ngOnInit() {
    this.loading = true;
    this.route.paramMap.subscribe((params) => {
      this.slug = params.get('slug') || '';

      if (!this.slug) {
        this.router.navigate(['/']);
        return;
      }

      const existing = this.productService.productDetail$();
      if (existing) {
        this.setProduct(existing);
        return;
      }

      this.store.dispatch(loadProductBySlug({ slug: this.slug }));
      if (this.productDetail()) {
        this.setProduct(this.productDetail());
        console.log(this.productDetail());
      }
    });
  }

  ngOnDestroy(): void {
    this.slug = '';
    this.seoService.default();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.updateIndicator();
    });
  }

  /*** PRODUCT ***/
  private setProduct(product: any) {
    if (!product) return;

    this.product = product;
    if (product.images?.length) {
      this.mainImage = product.images[0];
    }
    this.seoService.setMetaData(
      { key: 'name', value: product.title },
      { key: 'description', value: product.description }
    );
    this.loading = false;
  }
  loadProduct = (slug: string) => {};

  /*** HELPERS ***/

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

  get indicatorTranslate(): number {
    return (this.segmentIndicator - 1) * 100;
  }

  segment(value: number) {
    this.segmentIndicator = value;
    this.updateIndicator();
  }

  private updateIndicator() {
    const tab = this.tabs.toArray()[this.segmentIndicator - 1];
    if (!tab) return;

    const el = tab.nativeElement;
    this.indicatorWidth = el.offsetWidth;
    this.indicatorLeft = el.offsetLeft;
  }

  openModal() {
    this.modalService.open(ShareComponent, {
      size: 'md',
      data: {
        productUrl: window.location.href,
        productTitle: this.product?.title || '',
      },
    });
  }

  favoriteProduct(){
    this.isFavorite.set(!this.isFavorite());
    console.log('Producto agregado a favoritos');
  }
}
