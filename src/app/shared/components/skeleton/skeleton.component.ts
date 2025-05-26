import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault, NgxSkeletonLoaderModule],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {

  @Input() typeskeleton: 'productCard' | 'productDetails' | 'list' | '' = '';
}
