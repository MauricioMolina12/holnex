import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUser } from '../../../../shared/models/auth-user.model';

@Component({
  selector: 'app-profile-edit-form',
  templateUrl: './profile-edit-form.component.html',
  styleUrl: './profile-edit-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileEditFormComponent implements OnInit, OnChanges {
  @Input() user: AuthUser | null = null;
  @Input() updating: boolean = false;
  @Output() save = new EventEmitter<Partial<AuthUser>>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user && this.form) {
      this.form.patchValue(this.user);
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name:      [this.user?.name      ?? '', [Validators.required, Validators.minLength(2)]],
      phone:     [this.user?.phone     ?? ''],
      address:   [this.user?.address   ?? ''],
      countryId: [this.user?.countryId ?? ''],
    });
  }

  onSubmit(): void {
    if (this.form.valid && !this.updating) {
      this.save.emit(this.form.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }
}
