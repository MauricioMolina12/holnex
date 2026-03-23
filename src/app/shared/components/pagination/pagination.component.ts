
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComboboxComponent } from '../combobox/combobox.component';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
    imports: [ComboboxComponent]
})
export class PaginationComponent {
  @Input({ required: true }) totalPages!: number;
  @Input() currentPage: number = 1;
  @Input() disabled: boolean = false;
  @Input() visiblePages: number = 5;

  @Output() pageChange = new EventEmitter<number>();

  changePage(page: number): void {
    if (
      this.disabled ||
      page < 1 ||
      page > this.totalPages ||
      page === this.currentPage
    ) {
      return;
    }

    this.pageChange.emit(page);
  }

  get pages(): (number | '...')[] {
        
    const pages: (number | '...')[] = [];
    const half = Math.floor(this.visiblePages / 2);    

    let start = Math.max(2, this.currentPage - half);
    let end = Math.min(this.totalPages - 1, this.currentPage + half);

    if (start > 2) {
      pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < this.totalPages - 1) {
      pages.push('...');
    }

    return [1, ...pages, this.totalPages].filter(
      (value, index, self) => self.indexOf(value) === index
    );
  }
}
