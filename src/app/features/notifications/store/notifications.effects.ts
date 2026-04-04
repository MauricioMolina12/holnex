import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NotificationsService } from '../services/notifications.service';
import {
  loadNotifications,
  loadNotificationsSuccess,
  loadNotificationsFailure,
  markAsRead,
  markAsReadSuccess,
  markAsReadFailure,
  markAllAsRead,
  markAllAsReadSuccess,
  markAllAsReadFailure,
} from './notifications.actions';

@Injectable()
export class NotificationsEffects {

  loadNotifications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadNotifications),
      switchMap(() =>
        this.notificationsService.getNotifications().pipe(
          map((notifications) => loadNotificationsSuccess({ notifications })),
          catchError((error) =>
            of(loadNotificationsFailure({ error: error.message || 'Error al cargar notificaciones' }))
          )
        )
      )
    )
  );

  markAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markAsRead),
      switchMap(({ id }) =>
        this.notificationsService.markAsRead(id).pipe(
          map(() => markAsReadSuccess({ id })),
          catchError((error) =>
            of(markAsReadFailure({ error: error.message || 'Error al marcar como leída' }))
          )
        )
      )
    )
  );

  markAllAsRead$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markAllAsRead),
      switchMap(() =>
        this.notificationsService.markAllAsRead().pipe(
          map(() => markAllAsReadSuccess()),
          catchError((error) =>
            of(markAllAsReadFailure({ error: error.message || 'Error al marcar todas como leídas' }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private notificationsService: NotificationsService
  ) {}
}
