import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';

// Store
import { profileReducer } from './store/profile.reducer';
import { ProfileEffects } from './store/profile.effects';

// Components
import { ProfileSidebarComponent } from './components/profile-sidebar/profile-sidebar.component';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';
import { ProfileStatsComponent } from './components/profile-stats/profile-stats.component';
import { ProfileOrderCardComponent } from './components/profile-order-card/profile-order-card.component';
import { ProfileEditFormComponent } from './components/profile-edit-form/profile-edit-form.component';

// Pages
import { ProfileOverviewComponent } from './pages/profile-overview/profile-overview.component';
import { ProfileOrdersComponent } from './pages/profile-orders/profile-orders.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';

// Shared Standalone Components
import { ButtonComponent } from '../../shared/components/ui/button/button.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileSidebarComponent,
    ProfileHeaderComponent,
    ProfileStatsComponent,
    ProfileOrderCardComponent,
    ProfileEditFormComponent,
    ProfileOverviewComponent,
    ProfileOrdersComponent,
    ProfileSettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ProfileRoutingModule,
    
    StoreModule.forFeature('profile', profileReducer),
    EffectsModule.forFeature([ProfileEffects]),
    ButtonComponent,
    PaginationComponent,
  ]
})
export class ProfileModule { }
