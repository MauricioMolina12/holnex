import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProfileSellerComponent } from './components/card-profile-seller/card-profile-seller.component';
import { ButtonComponent } from '../../shared/components/ui/button/button.component';



@NgModule({
  declarations: [
    CardProfileSellerComponent
  ],
  imports: [
    CommonModule,
    ButtonComponent
  ],
  exports: [CardProfileSellerComponent]
})
export class SellersModule { }
