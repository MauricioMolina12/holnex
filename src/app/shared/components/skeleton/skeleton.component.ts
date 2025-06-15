import {
  NgFor,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { skeletonType } from './skeleton.type.enum';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgFor,
    NgSwitchDefault,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() typeskeleton: skeletonType = skeletonType.productCard;
  
  skeletonType = skeletonType;
}
