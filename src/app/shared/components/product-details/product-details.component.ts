import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/products';
import { ProductsService } from '../products/products.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  @Input() product!: any;

  constructor(private productService: ProductsService) {}

  private route = inject(ActivatedRoute);
  id!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';
      if (this.productService.product_detail) {
        this.product = this.productService.product_detail;
      } else {
        this.getProductById(this.id);
      }
    });
  }
  getProductById(id: string) {
    this.productService.getProductBYId(id).subscribe((product) => {
      this.product = product;
    });
  }
}
