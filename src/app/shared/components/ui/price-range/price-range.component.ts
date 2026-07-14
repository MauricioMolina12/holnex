import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-price-range',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="price-range">
      <button class="price-range__header" (click)="collapsed = !collapsed">
        <span class="price-range__title">{{ title }}</span>
        <i class="price-range__arrow" [class.collapsed]="collapsed" [ngClass]="'icon-arrow-chevron-right'"></i>
      </button>

      @if (!collapsed) {
        <div class="price-range__inputs">
          <div class="price-range__field">
            <span class="price-range__currency">$</span>
            <input
              type="number"
              [placeholder]="'Mín'"
              [ngModel]="min"
              (ngModelChange)="min = $event"
              class="price-range__input"
              min="0"
            />
          </div>
          <span class="price-range__separator">—</span>
          <div class="price-range__field">
            <span class="price-range__currency">$</span>
            <input
              type="number"
              [placeholder]="'Máx'"
              [ngModel]="max"
              (ngModelChange)="max = $event"
              class="price-range__input"
              min="0"
            />
          </div>
          <button class="price-range__apply" (click)="onApply()">
            <i class="icon-arrow-chevron-right"></i>
          </button>
        </div>

        <div class="price-range__presets">
          @for (preset of presets; track preset.label) {
            <button
              class="price-range__preset"
              [class.active]="min === preset.min && max === preset.max"
              (click)="onPreset(preset.min, preset.max)">
              {{ preset.label }}
            </button>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .price-range {
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

      &__inputs {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 0.6rem;
      }

      &__field {
        display: flex;
        align-items: center;
        border: 1px solid var(--color-border, var(--color-medium));
        border-radius: 6px;
        padding: 0.35rem 0.5rem;
        flex: 1;
      }

      &__currency {
        font-size: 0.8rem;
        color: var(--color-gray);
        margin-right: 0.2rem;
      }

      &__input {
        width: 100%;
        border: none;
        outline: none;
        font-size: 0.8rem;
        background: transparent;
        color: var(--color-dark);

        &::-webkit-inner-spin-button,
        &::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }

      &__separator {
        color: var(--color-gray);
        font-size: 0.8rem;
        flex-shrink: 0;
      }

      &__apply {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        border: none;
        background-color: var(--color-primary);
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        i {
          font-size: 0.6rem;

          &::before {
            color: white;
          }
        }
      }

      &__presets {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }

      &__preset {
        padding: 0.3rem 0.6rem;
        border: 1px solid var(--color-border, var(--color-medium));
        border-radius: 20px;
        background: transparent;
        font-size: 0.75rem;
        color: var(--color-dark-gray);
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover,
        &.active {
          background-color: var(--color-primary);
          border-color: var(--color-primary);
          color: white;
        }
      }
    }
  `],
})
export class PriceRangeComponent {
  @Input() title = 'Precio';
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Output() rangeChange = new EventEmitter<{ min: number | null; max: number | null }>();

  collapsed = false;

  presets = [
    { label: 'Hasta $50', min: null, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: 'Más de $200', min: 200, max: null },
  ];

  onApply(): void {
    this.rangeChange.emit({ min: this.min, max: this.max });
  }

  onPreset(min: number | null, max: number | null): void {
    this.min = min;
    this.max = max;
    this.rangeChange.emit({ min, max });
  }
}
