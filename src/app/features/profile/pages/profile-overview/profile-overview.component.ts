import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { loadOrders, loadProfileStats } from '../../store/profile.actions';
import {
  selectOrdersLoaded,
  selectProfileLoading,
  selectProfileOrders,
  selectProfileStats,
  selectStatsLoaded,
} from '../../store/profile.selectors';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileOverviewComponent implements OnInit {
  orders  = toSignal(this.store.select(selectProfileOrders), { initialValue: [] });
  stats   = toSignal(this.store.select(selectProfileStats),  { initialValue: null });
  loading = toSignal(this.store.select(selectProfileLoading), { initialValue: false });

  get recentOrders() {
    return this.orders().slice(0, 3);
  }

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.select(selectOrdersLoaded).pipe(take(1)).subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadOrders());
    });
    this.store.select(selectStatsLoaded).pipe(take(1)).subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProfileStats());
    });
  }
}
