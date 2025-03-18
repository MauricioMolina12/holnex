import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopcartComponent } from './shopcart.component';

const routes: Routes = [
  {
    path: '',
    component: ShopcartComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopcartRoutingModule { }
