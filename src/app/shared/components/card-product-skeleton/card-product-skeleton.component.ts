import { NgClass, NgFor } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-card-product-skeleton',
  templateUrl: './card-product-skeleton.component.html',
  standalone: true,
  imports: [NgFor, NgClass, NgxSkeletonLoaderModule],
  styleUrl: './card-product-skeleton.component.scss'
})
export class CardProductSkeletonComponent {

  @Input() @HostBinding('class') customClass = '';
}
