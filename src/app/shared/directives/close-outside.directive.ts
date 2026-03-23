import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";

@Directive({ standalone: false,
  selector: "[clickOutsideDdown]",
})
export class CloseOutsideDirective {
  constructor(private _elementRef: ElementRef) {}

  @Input() ignoreElements: string[] = [];
  @Output("clickOutsideDdown") clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent) {
    const path = event.composedPath();
    const clickedInside = path.includes(this._elementRef.nativeElement);

    const targetElement =  event.target as HTMLElement;

    if (this.ignoreElements.includes(targetElement.id)) {
      return;
    }

    if (!clickedInside) {
      this.clickOutside.emit(targetElement);
    }
  }
} 

