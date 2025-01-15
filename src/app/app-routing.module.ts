import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/features/home/home.module').then((home) => home.HomeModule),
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
