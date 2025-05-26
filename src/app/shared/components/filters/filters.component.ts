import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Input,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser, NgClass, NgFor } from '@angular/common';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectLoading } from '../../../features/products/store/selectors/product.selectors';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  standalone: true,
  imports: [NgClass, NgFor],
})
export class FiltersComponent implements OnInit, OnDestroy {
  openFilter: string | null = null;
  private isBrowser: boolean;
  @Input() loading: boolean = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  @Input() filters: string[] = [];
  ngOnInit(): void {
    if (this.isBrowser) {
      this.filters = ['Categoría', 'Tamaño', 'Precio', 'Puntuación', 'Color'];
      this.document.addEventListener('click', this.handleClickOutside);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this.document.removeEventListener('click', this.handleClickOutside);
    }
  }

  toggleFilter(filter: string) {
    this.openFilter = this.openFilter === filter ? null : filter;
  }

  isOpen(filter: string): boolean {
    return this.openFilter === filter;
  }

  handleClickOutside = (event: MouseEvent) => {
    const modal = this.document.querySelector('.filters');
    if (modal && !modal.contains(event.target as Node)) {
      this.openFilter = null;
    }
  };
}
