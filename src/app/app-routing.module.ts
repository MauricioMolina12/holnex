import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/features/layout/layout.module').then((home) => home.LayoutModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../app/features/auth/auth.module').then((user) => user.AuthModule),
  },
  {
    path: '**', 
    redirectTo: '', 
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
