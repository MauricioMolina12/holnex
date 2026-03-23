import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

export interface SearchItem {
  id?: string | number;
  name: string;
  highlights?: { name?: string | string[] };
  [key: string]: any;
}

@Component({
    selector: 'search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() placeholder = 'Buscar...';
  @Input() items: SearchItem[] = [];
  @Input() loading = false;
  @Input() searchQuery = '';
  @Input() displayProperty: keyof SearchItem = 'name';
  @Input() icon = 'icon-search';
  @Input() executeOnEnter = true;
  @Input() open = false;

  @Output() search = new EventEmitter<string>();
  @Output() select = new EventEmitter<SearchItem>();
  @Output() clear = new EventEmitter<void>();
  @Output() openChange = new EventEmitter<boolean>();
  @Output() enter = new EventEmitter<string>();
  @Output() blurred = new EventEmitter<void>();

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef<HTMLInputElement>;

  public id = crypto.randomUUID();

  focus = false;
  private clickUnlisten?: () => void;

  constructor(
    private elRef: ElementRef,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.clickUnlisten = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        if (this.open && !this.elRef.nativeElement.contains(event.target)) {
          this.closeDropdown();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.clickUnlisten) this.clickUnlisten();
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.search.emit(this.searchQuery);
  }

  onEnterKey(): void {
    if (this.executeOnEnter) {
      this.search.emit(this.searchQuery);
      this.enter.emit(this.searchQuery);
    }
  }

  toggleDropdown(): void {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  onSelectItem(item: SearchItem): void {
    this.select.emit(item);
    this.closeDropdown();
  }

  clearSearch(): void {
    if (!this.searchQuery) {
      this.blurInput();
      return;
    }
    this.searchQuery = '';
    this.clear.emit();
    this.focusInput();
  }

  onFocus(): void {
    this.focus = true;
    this.open = true;
    this.openChange.emit(true);
  }

  blurInput(): void {
    this.focus = false;
    this.open = false;
    this.openChange.emit(false);
    this.searchInput.nativeElement.blur();
    this.blurred.emit();
  }

  focusInput(): void {
    this.focus = true;
    this.open = true;
    this.openChange.emit(true);
    this.searchInput.nativeElement.focus();
  }

  getHighlightedText(item: SearchItem): SafeHtml {
    let text = item?.highlights?.name ?? item?.name ?? '';
    if (Array.isArray(text)) text = text[0];
    const decoded = this.decodeHtml(text);
    return this.sanitizer.bypassSecurityTrustHtml(decoded);
  }

  private closeDropdown(): void {
    this.focus = false;
    this.open = false;
    this.openChange.emit(false);
    this.blurred.emit();
  }

  private decodeHtml(html: string): string {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
}
