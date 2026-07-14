import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { notificationsReducer } from './store/notifications.reducer';
import { NotificationsEffects } from './store/notifications.effects';
import { NotificationsPanelComponent } from './components/notifications-panel/notifications-panel.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';

@NgModule({
  declarations: [
    NotificationsPanelComponent,
    NotificationItemComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('notifications', notificationsReducer),
    EffectsModule.forFeature([NotificationsEffects]),
    ClickOutsideDirective
  ],
  exports: [
    NotificationsPanelComponent,
  ],
})
export class NotificationsModule {}
