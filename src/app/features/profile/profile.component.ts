import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { take } from 'rxjs';
import { loadProfile } from './store/profile.actions';
import { selectProfileLoading } from './store/profile.selectors';
import { selectAuthLoaded, selectAuthUser } from '../../store/user/user.selectors';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfileComponent implements OnInit {
  user    = toSignal(this.store.select(selectAuthUser),        { initialValue: null  });
  loading = toSignal(this.store.select(selectProfileLoading),  { initialValue: false });

  currentRoute = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map((e) => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  constructor(
    private store: Store,
    private router: Router,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.store.select(selectAuthLoaded).pipe(take(1)).subscribe((loaded) => {
      if (!loaded) this.store.dispatch(loadProfile());
    });
  }

  onLogout(): void {
    this.profileService.clearCache();
    this.router.navigate(['/user/login']);
  }
}
