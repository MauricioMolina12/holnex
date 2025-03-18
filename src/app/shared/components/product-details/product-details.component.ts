import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { ProductsService } from '../products/products.service';
import { NgClass, NgFor, NgIf, NgStyle, NgSwitch, NgSwitchCase } from '@angular/common';
import { TruncatePipe } from '../../pipes/shared.pipe';
import { CategoriesComponent } from '../categories/categories.component';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    TruncatePipe,
    CategoriesComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  // Inputs
  @Input() product!: any;



  // Variables
  segmentIndicator: number = 1;
  description: string =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit impedit, nostrum consequuntur et distinctio nobis natus esse quia sunt? Similique exercitationem totam tenetur ipsam quisquam doloribus reprehenderit voluptates obcaecati deleniti. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit impedit, nostrum consequuntur et distinctio nobis natus esse quia sunt? Similique exercitationem totam tenetur ipsam quisquam doloribus reprehenderit voluptates obcaecati deleniti Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit impedit, nostrum consequuntur et distinctio nobis natus esse quia sunt? Similique exercitationem totam tenetur ipsam quisquam doloribus reprehenderit voluptates obcaecati deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti delenitidelenitideleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti deleniti';
  showFullText: boolean = false;
  visibleComments: string[] = [];
  currentIndex: number = 0;
  id!: string;
  quantityProduct: number = 1;


  // List
  buttons = [
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
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      if (this.productService.productDetail) {
        this.product = this.productService.productDetail;
      } else {
        this.getProductById(this.id);
        console.log(this.product);
      }
    });

    // this.updateVisibleComments();
  }

  getProductById(id: string) {
    this.productService.getProductBYId(id).subscribe((product) => {
      this.product = product;
    });
  }

  segment(type: number) {
    type == 1 ? (this.segmentIndicator = 1) : (this.segmentIndicator = 2);
  }

  // Functions for comments the of reviews
  // updateVisibleComments() {
  //   this.visibleComments = [this.comments[this.currentIndex]];
  // }

  // prevComment() {
  //   this.currentIndex = (this.currentIndex - 1 + this.comments.length) % this.comments.length;
  //   this.updateVisibleComments();
  // }

  // nextComment() {
  //   this.currentIndex = (this.currentIndex + 1) % this.comments.length;
  //   this.updateVisibleComments();
  // }

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
}
