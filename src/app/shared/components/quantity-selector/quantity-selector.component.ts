import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';


@Component({
    selector: 'app-quantity-selector',
    imports: [],
    templateUrl: './quantity-selector.component.html',
    styleUrls: ['./quantity-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuantitySelectorComponent {
  @Input() value: number = 1;
  @Input() min: number = 1;
  @Input() max: number = 99;
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<number>();
  @Output() increase = new EventEmitter<number>();
  @Output() decrease = new EventEmitter<number>();

  onIncrease(): void {
    if (this.disabled || this.value >= this.max) return;

    const newValue = this.value + 1;
    this.emitChange(newValue);
    this.increase.emit(newValue);
  }

  onDecrease(): void {
    if (this.disabled || this.value <= this.min) return;

    const newValue = this.value - 1;
    this.emitChange(newValue);
    this.decrease.emit(newValue);
  }

  private emitChange(value: number): void {
    this.valueChange.emit(value);
  }
}
