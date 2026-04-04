import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CheckboxFilterOption {
  label: string;
  value: string;
  count?: number;
}

@Component({
  selector: 'app-checkbox-filter',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="checkbox-filter">
      <button class="checkbox-filter__header" (click)="collapsed = !collapsed">
        <span class="checkbox-filter__title">{{ title }}</span>
        <i class="checkbox-filter__arrow" [class.collapsed]="collapsed" [ngClass]="'icon-arrow-chevron-right'"></i>
      </button>

      @if (!collapsed) {
        @if (searchable && options.length > 5) {
          <div class="checkbox-filter__search">
            <input
              type="text"
              [placeholder]="'Buscar ' + title.toLowerCase() + '...'"
              (input)="onSearchInput($event)"
              class="checkbox-filter__search-input"
            />
          </div>
        }
        <div class="checkbox-filter__list">
          @for (option of filteredOptions; track option.value) {
            <label class="checkbox-filter__item">
              <input
                type="checkbox"
                [checked]="isSelected(option.value)"
                (change)="onToggle(option.value)"
                class="checkbox-filter__checkbox"
              />
              <span class="checkbox-filter__label">{{ option.label }}</span>
              @if (option.count !== undefined) {
                <span class="checkbox-filter__count">({{ option.count }})</span>
              }
            </label>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .checkbox-filter {
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 0.75rem 0;
        background: none;
        border: none;
        cursor: pointer;
      }

      &__title {
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-dark-gray);
      }

      &__arrow {
        font-size: 0.65rem;
        transition: transform 0.2s ease;
        transform: rotate(90deg);

        &.collapsed {
          transform: rotate(0deg);
        }
      }

      &__search {
        margin-bottom: 0.5rem;
      }

      &__search-input {
        width: 100%;
        padding: 0.45rem 0.6rem;
        border: 1px solid var(--color-border, var(--color-medium));
        border-radius: 6px;
        font-size: 0.8rem;
        outline: none;
        box-sizing: border-box;
        background: transparent;
        color: var(--color-dark);

        &:focus {
          border-color: var(--color-primary);
        }
      }

      &__list {
        display: flex;
        flex-direction: column;
        gap: 0.15rem;
        max-height: 200px;
        overflow-y: auto;
      }

      &__item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.35rem 0.25rem;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.8rem;
        transition: background-color 0.15s ease;

        &:hover {
          background-color: var(--color-hover-light, rgba(0, 0, 0, 0.03));
        }
      }

      &__checkbox {
        width: 16px;
        height: 16px;
        accent-color: var(--color-primary);
        cursor: pointer;
        flex-shrink: 0;
      }

      &__label {
        flex: 1;
        color: var(--color-dark);
      }

      &__count {
        color: var(--color-gray);
        font-size: 0.75rem;
      }
    }
  `],
})
export class CheckboxFilterComponent {
  @Input() title = '';
  @Input() options: CheckboxFilterOption[] = [];
  @Input() selected: string[] = [];
  @Input() searchable = false;
  @Output() selectionChange = new EventEmitter<string>();

  collapsed = false;
  searchText = '';

  get filteredOptions(): CheckboxFilterOption[] {
    if (!this.searchText) return this.options;
    const q = this.searchText.toLowerCase();
    return this.options.filter((o) => o.label.toLowerCase().includes(q));
  }

  isSelected(value: string): boolean {
    return this.selected.includes(value);
  }

  onToggle(value: string): void {
    this.selectionChange.emit(value);
  }

  onSearchInput(event: Event): void {
    this.searchText = (event.target as HTMLInputElement).value;
  }
}
