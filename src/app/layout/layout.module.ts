import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { PromoBannerComponent } from './components/promo-banner/promo-banner.component';
import { CoreModule } from '../core/core.module';
import { NotificationsAlertComponent } from '../shared/components/notifications-alert/notifications-alert.component';
import { TooltipDirective } from '../shared/directives/tooltip.directive';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    CoreModule,
    PromoBannerComponent,
    NotificationsAlertComponent,
    TooltipDirective,
  ],
  exports: [TooltipDirective]
})
export class LayoutModule { }
