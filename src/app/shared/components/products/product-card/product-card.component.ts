import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { Product } from '../../../../features/products/models/products.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-product-card',
    imports: [NgClass],
    templateUrl: './product-card.component.html',
    styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  
  @Input() product!: Product;
  @Input() horizontal: boolean = false;
  @Input() hoverImage: boolean = false;

  @Output() productClick = new EventEmitter<Product>();

  public indexImage = 0;
  public isFade: boolean = false;

  isDark!: Signal<boolean>;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.isDark = this.themeService.darkModeSignal;
  }

  onMouseEnter() {
    this.isFade = true;
    this.indexImage = 1;
    setTimeout(() => { this.isFade = false}, 500);
  }

  onMouseLeave() {
    this.isFade = true;
    this.indexImage = 0;
    setTimeout(() => { this.isFade = false}, 500);
  }

  onProductClick(product: Product): void {
    this.productClick.emit(product);
  }
}
