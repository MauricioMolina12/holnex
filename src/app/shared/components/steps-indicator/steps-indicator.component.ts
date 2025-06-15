import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-steps-indicator',
  templateUrl: './steps-indicator.component.html',
  styleUrl: './steps-indicator.component.scss',
  standalone: true,
  imports: [NgFor, NgClass],
})
export class StepsIndicatorComponent implements OnChanges {
  @Input() steps: number = 0;
  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();

  stepArray: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if ('steps' in changes) {
      this.stepArray = Array.from({ length: this.steps }, (_, i) => i + 1);
    }
  }

  isCompleted(index: number): boolean {
    return index < this.step - 1;
  }

  isCurrent(index: number): boolean {
    return index + 1 === this.step;
  }

  updateStep(index: number): void {
    this.step = index + 1;
    this.stepChange.emit(this.step);
  }
}
