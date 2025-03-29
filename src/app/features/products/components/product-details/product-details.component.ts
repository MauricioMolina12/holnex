import {
  Component,
  computed,
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
@Component({
  selector: 'app-product-details',
  standalone: false,
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  // Inputs
  @Input() product!: any;
  @ViewChildren('imagesProducts') imagesProducts!: QueryList<ElementRef>;

  // Variables
  segmentIndicator: number = 1;
  showFullText: boolean = false;
  visibleComments: string[] = [];
  id!: string;
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

  private route = inject(ActivatedRoute);
  constructor(
    public productService: ProductsService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Get the route id
    this.route.paramMap.subscribe(async (params) => {
      // Route ID
      this.id = params.get('id') || '';

      this.loading = true;

      // Save product from signal
      if (!this.productService.productDetail()?.id) {
        await this.getProductById(this.id);
      }


      this.product = computed(() => this.productService.productDetail());

      
      this.productService.getAllProducts();
      this.relatedProducts = await this.productService.products();


      // Save first image (main image)
      if (this.product()?.images.length) {
        this.mainImage = this.product().images[0];
      }
    
      this.loading = false;
    
    });
  }

  getProductById(id: string) {
    this.productService.getProductById(id);
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
