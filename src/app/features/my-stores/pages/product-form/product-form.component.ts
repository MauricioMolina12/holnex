import { Component, OnInit, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectSelectedStore } from '../../store/my-stores.selectors';
import * as MyStoresActions from '../../store/my-stores.actions';
import { StoreProduct } from '../../models/my-stores.model';
import { Store as SellerStore } from '../../models/my-stores.model';
import { take } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  form!: FormGroup;
  isEditMode = signal(false);
  saving = signal(false);
  isDragOver = signal(false);
  imageFiles = signal<File[]>([]);
  imagePreviews = signal<string[]>([]);
  currentStore: SellerStore | null = null;

  pageTitle = computed(() => this.isEditMode() ? 'Editar producto' : 'Nuevo producto');

  categoryOptions = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
    'Health & Beauty',
    'Automotive',
  ];

  tagOptions = [
    'Internet Of Things',
    'New Arrival',
    'Best Seller',
    'On Sale',
    'Featured',
    'Limited Edition',
  ];

  discountTypeOptions = [
    { label: 'Percentage', value: 'percentage' },
    { label: 'Fixed Amount', value: 'fixed' },
  ];

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.store.select(selectSelectedStore).pipe(take(1)).subscribe((store) => {
      this.currentStore = store;
    });

    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId && productId !== 'new') {
      this.isEditMode.set(true);
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0)]],
      discountPercentage: [null, [Validators.min(0), Validators.max(100)]],
      discountType: [''],
      category: [''],
      tags: [''],
      sku: ['', Validators.required],
      barcode: [''],
      stock: [0, [Validators.required, Validators.min(0)]],
    });
  }

  // ─── Image handling ────────────────────────────────────────

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false);

    const files = event.dataTransfer?.files;
    if (files) {
      this.addFiles(Array.from(files));
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.addFiles(Array.from(input.files));
      input.value = '';
    }
  }

  private addFiles(files: File[]): void {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    const currentFiles = this.imageFiles();
    const currentPreviews = this.imagePreviews();

    imageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageFiles.set([...this.imageFiles(), file]);
        this.imagePreviews.set([...this.imagePreviews(), reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }

  removeImage(index: number): void {
    const files = [...this.imageFiles()];
    const previews = [...this.imagePreviews()];
    files.splice(index, 1);
    previews.splice(index, 1);
    this.imageFiles.set(files);
    this.imagePreviews.set(previews);
  }

  replaceImage(index: number): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const files = [...this.imageFiles()];
          const previews = [...this.imagePreviews()];
          files[index] = file;
          previews[index] = reader.result as string;
          this.imageFiles.set(files);
          this.imagePreviews.set(previews);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  // ─── Form submission ───────────────────────────────────────

  onSubmit(): void {
    if (this.form.invalid || !this.currentStore) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.form.getRawValue();

    const product: Partial<StoreProduct> = {
      name: formValue.name,
      description: formValue.description,
      price: formValue.price,
      sku: formValue.sku,
      stock: formValue.stock,
      categories: formValue.category ? [formValue.category] : [],
      tags: formValue.tags ? [formValue.tags] : [],
      images: [],
      thumbnail: '',
      currency: this.currentStore.settings?.currency || 'USD',
      status: 'draft',
      availability: 'in_stock',
    };

    this.store.dispatch(MyStoresActions.createStoreProduct({
      storeId: this.currentStore.id,
      product,
    }));

    this.goBack();
  }

  goBack(): void {
    const storeSlug = this.route.parent?.snapshot.paramMap.get('storeSlug');
    this.router.navigate(['/my-stores', storeSlug, 'products']);
  }

  hasError(field: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.invalid && control.touched);
  }

  getError(field: string): string {
    const control = this.form.get(field);
    if (!control || !control.errors) return '';
    if (control.errors['required']) return 'This field is required';
    if (control.errors['minlength']) return `Minimum ${control.errors['minlength'].requiredLength} characters`;
    if (control.errors['min']) return `Minimum value is ${control.errors['min'].min}`;
    if (control.errors['max']) return `Maximum value is ${control.errors['max'].max}`;
    return '';
  }
}
