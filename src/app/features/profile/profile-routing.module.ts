import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileOverviewComponent } from './pages/profile-overview/profile-overview.component';
import { ProfileOrdersComponent } from './pages/profile-orders/profile-orders.component';
import { ProfileSettingsComponent } from './pages/profile-settings/profile-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: ProfileOverviewComponent },
      { path: 'orders', component: ProfileOrdersComponent },
      { path: 'settings', component: ProfileSettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
