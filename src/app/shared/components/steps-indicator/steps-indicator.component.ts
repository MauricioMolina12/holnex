import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-steps-indicator',
  templateUrl: './steps-indicator.component.html',
  styleUrl: './steps-indicator.component.scss',
  standalone: true,
  imports: [NgFor, NgClass],
})
export class StepsIndicatorComponent implements AfterViewInit {
  @Input() steps: number = 0;
  @Input() step: number = 1;
  @Output() stepChange = new EventEmitter<number>();

  stepArray: number[] = [];

  ngAfterViewInit(): void {
    this.stepArray = Array.from({ length: this.steps }, (_, i) => i + 1);
  }

  isCompleted(index: number): boolean {
    return index < this.step - 1;
  }

  isCurrent(index: number): boolean {
    return index + 1 === this.step;
  }

  updateStep(index: number) {
    this.step = index + 1;
    this.stepChange.emit(index + 1);
  }
}
