import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  forwardRef,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  HostListener,
  TemplateRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface ComboboxItem {
  id: string | number;
  [key: string]: any;
}

@Component({
    selector: 'combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.scss'],
    imports: [CommonModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ComboboxComponent),
            multi: true,
        },
    ]
})
export class ComboboxComponent implements ControlValueAccessor, AfterViewInit {

  @Input() items: ComboboxItem[] = [];
  @Input() displayProperty!: keyof ComboboxItem;
  @Input() placeholder = 'Seleccione una opción';
  @Input() itemTemplate?: TemplateRef<any>;
  @Input() initialValue: ComboboxItem | null = null;
  @Input() disabled = false;

  @Output() itemSelected = new EventEmitter<ComboboxItem>();
  @Output() bottomEmit = new EventEmitter<void>();

  @ViewChild('comboBox', { static: true }) comboBox!: ElementRef<HTMLElement>;

  @ViewChildren('option') options!: QueryList<ElementRef<HTMLElement>>;

  selectedItem: ComboboxItem | null = null;
  showOptions = false;
  focusedIndex: number | null = null;

  private typeBuffer = '';
  private bufferTimeout?: number;

  private onChange: (value: ComboboxItem | null) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: ComboboxItem | null): void {
    this.selectedItem = value;
  }

  registerOnChange(fn: (value: ComboboxItem | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  ngAfterViewInit(): void {
    if (this.initialValue) {
      this.selectItem(this.initialValue, false);
    }
  }


  toggleOptions(): void {
    if (this.disabled) return;
    this.showOptions = !this.showOptions;
  }

  selectItem(item: ComboboxItem, emit = true): void {
    this.selectedItem = item;
    this.showOptions = false;
    this.focusedIndex = null;

    this.onChange(item);
    this.onTouched();

    if (emit) {
      this.itemSelected.emit(item);
    }
  }


  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled) return;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNext();
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.focusPrevious();
        break;

      case 'Enter':
        event.preventDefault();
        this.selectFocused();
        break;

      case 'Escape':
        this.showOptions = false;
        break;

      default:
        if (event.key.length === 1) {
          this.handleTypeAhead(event.key);
        }
    }
  }

  private handleTypeAhead(char: string): void {
    this.typeBuffer += char.toLowerCase();

    const index = this.items.findIndex((item) =>
      String(item[this.displayProperty]).toLowerCase().includes(this.typeBuffer)
    );

    if (index !== -1) {
      this.focusItem(index);
    }

    clearTimeout(this.bufferTimeout);
    this.bufferTimeout = window.setTimeout(() => {
      this.typeBuffer = '';
    }, 500);
  }


  private focusItem(index: number): void {
    const option = this.options.get(index);
    option?.nativeElement.focus();
    this.focusedIndex = index;
  }

  private focusNext(): void {
    if (!this.showOptions) {
      this.showOptions = true;
      return;
    }

    const next =
      this.focusedIndex === null
        ? 0
        : Math.min(this.focusedIndex + 1, this.items.length - 1);

    this.focusItem(next);
  }

  private focusPrevious(): void {
    if (this.focusedIndex === null) return;

    const prev = Math.max(this.focusedIndex - 1, 0);
    this.focusItem(prev);
  }

  private selectFocused(): void {
    if (this.focusedIndex === null) return;
    const item = this.items[this.focusedIndex];
    if (item) {
      this.selectItem(item);
    }
  }


  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const target = event.target as HTMLElement | null;

    if (!target) {
      return;
    }

    const position = target.scrollTop + target.clientHeight;
    const height = target.scrollHeight;

    if (position >= height * 0.8) {
      this.bottomEmit.emit();
    }
  }
}
