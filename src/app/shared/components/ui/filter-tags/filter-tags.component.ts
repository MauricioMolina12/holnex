import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FilterTag {
  key: string;
  label: string;
  value: string;
}

@Component({
  selector: 'app-filter-tags',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (tags.length > 0) {
      <div class="filter-tags">
        @for (tag of tags; track tag.key + tag.value) {
          <span class="filter-tags__tag">
            {{ tag.label }}
            <button class="filter-tags__remove" (click)="remove.emit(tag)" aria-label="Eliminar filtro">
              &times;
            </button>
          </span>
        }
        <button class="filter-tags__clear" (click)="clearAll.emit()">
          Limpiar todo
        </button>
      </div>
    }
  `,
  styles: [`
    .filter-tags {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem;

      &__tag {
        display: inline-flex;
        align-items: center;
        gap: 0.3rem;
        padding: 0.3rem 0.55rem;
        background-color: var(--color-blue-light, #f2f8ff);
        border: 1px solid var(--color-secondary);
        border-radius: 20px;
        font-size: 0.75rem;
        color: var(--color-secondary);
        font-weight: 500;
      }

      &__remove {
        background: none;
        border: none;
        color: var(--color-secondary);
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
        padding: 0;
        margin-left: 0.1rem;

        &:hover {
          color: var(--color-danger, #dc4040);
        }
      }

      &__clear {
        background: none;
        border: none;
        font-size: 0.75rem;
        color: var(--color-secondary);
        cursor: pointer;
        font-weight: 500;
        text-decoration: underline;
        padding: 0.3rem 0.4rem;

        &:hover {
          color: var(--color-danger, #dc4040);
        }
      }
    }
  `],
})
export class FilterTagsComponent {
  @Input() tags: FilterTag[] = [];
  @Output() remove = new EventEmitter<FilterTag>();
  @Output() clearAll = new EventEmitter<void>();
}
