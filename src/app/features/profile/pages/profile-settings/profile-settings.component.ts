import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { updateProfile } from '../../store/profile.actions';
import {
  selectProfileLoading,
  selectProfileUpdating,
  selectProfileUser,
  selectUserLoaded,
} from '../../store/profile.selectors';
import { AuthUser } from '../../../../shared/models/auth-user.model';
import { getCountryById } from '../../../../shared/data/countries';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileSettingsComponent implements OnInit {
  user     = toSignal(this.store.select(selectProfileUser),    { initialValue: null  });
  loading  = toSignal(this.store.select(selectProfileLoading), { initialValue: false });
  updating = toSignal(this.store.select(selectProfileUpdating), { initialValue: false });

  isEditing = signal<boolean>(false);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectUserLoaded).pipe(take(1)).subscribe();
  }

  countryName(countryId: string | undefined): string {
    if (!countryId) return '—';
    return getCountryById(countryId)?.localName ?? countryId;
  }

  onEdit(): void {
    this.isEditing.set(true);
  }

  onSave(data: Partial<AuthUser>): void {
    this.store.dispatch(updateProfile({ user: data }));
    this.isEditing.set(false);
  }

  onCancel(): void {
    this.isEditing.set(false);
  }
}
