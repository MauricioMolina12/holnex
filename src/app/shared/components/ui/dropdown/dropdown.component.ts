import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ContentChild,
  AfterContentInit,
  Renderer2,
  OnDestroy,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';

import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
    selector: 'app-dropdown',
    imports: [],
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('dropdownAnimation', [
            state('closed', style({
                height: '0px',
                opacity: 0,
                overflow: 'hidden',
            })),
            state('open', style({
                height: '*',
                opacity: 1,
                overflow: 'hidden',
            })),
            transition('closed => open', [animate('200ms ease-out')]),
            transition('open => closed', [animate('150ms ease-in')]),
        ]),
    ]
})
export class DropdownComponent implements AfterContentInit, OnDestroy {
  @Input() closeOnContentClick = true;
  @Input() closeOnEscape = true;
  @Input() panelClass = '';
  @Input() isOpen = false;

  @Output() toggle = new EventEmitter<boolean>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @ContentChild('dropdownTrigger', { read: ElementRef })
  projectedTrigger?: ElementRef;
  @ContentChild('dropdownContent', { read: ElementRef })
  projectedContent?: ElementRef;

  private docClickUnlisten?: () => void;

  constructor(
    private hostEl: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngAfterContentInit(): void {
    // this.docClickUnlisten = this.renderer.listen(
    //   "document",
    //   "click",
    //   (event: MouseEvent) => this.onDocumentClick(event)
    // );
  }

  ngOnDestroy(): void {
    this.docClickUnlisten?.();
  }

  toggleDropdown(): void {
    this.toggle.emit(!this.isOpen);
  }

  open(): void {
    this.isOpen = true;
    this.opened.emit();
    setTimeout(() => this.focusFirstFocusableInContent(), 0);
  }

  close(): void {
    this.isOpen = false;
    this.closed.emit();
    try {
      const triggerEl = this.getTriggerElement();
      triggerEl?.focus();
    } catch {}
  }

  @HostListener('keydown', ['$event'])
  onHostKeydown(event: KeyboardEvent): void {
    if (this.closeOnEscape && event.key === 'Escape' && this.isOpen) {
      event.stopPropagation();
      this.close();
    }
  }

  private onDocumentClick(event: MouseEvent): void {
    const host = this.hostEl.nativeElement;
    const target = event.target as Node | null;
    if (!host.contains(target)) {
      if (this.isOpen) this.close();
    } else {
      if (this.closeOnContentClick) {
        const contentEl = this.getContentElement();
        if (contentEl && contentEl.contains(target)) {
          this.close();
        }
      }
    }
  }

  private getTriggerElement(): HTMLElement | null {
    if (this.projectedTrigger && this.projectedTrigger.nativeElement) {
      return this.projectedTrigger.nativeElement as HTMLElement;
    }
    return this.hostEl.nativeElement.querySelector(
      '[dropdown-trigger]'
    ) as HTMLElement | null;
  }

  private getContentElement(): HTMLElement | null {
    if (this.projectedContent && this.projectedContent.nativeElement) {
      return this.projectedContent.nativeElement as HTMLElement;
    }
    return this.hostEl.nativeElement.querySelector(
      '[dropdown-content]'
    ) as HTMLElement | null;
  }

  private focusFirstFocusableInContent(): void {
    const content = this.getContentElement();
    if (!content) return;
    const focusable = content.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.focus();
  }
}
