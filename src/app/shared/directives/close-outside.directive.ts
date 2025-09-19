import { Directive } from '@angular/core';
import { ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[CloseOutside]',
  standalone: true
})
export class CloseOutsideDirective {

  constructor(private elementRef: ElementRef) {}
  
  @Output() CloseOutside = new EventEmitter<void>();
  
  @HostListener('document:click', ['$event.target'])
  public onClick(target: HTMLElement) {
  if (!this.elementRef.nativeElement.contains(target)) {
    this.CloseOutside.emit();
  }
}
}