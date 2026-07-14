import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../../core/services/http.service';
import { Notification } from '../models/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationsService {

  constructor(private httpService: HttpService) {}

  getNotifications(): Observable<Notification[]> {
    // TODO: Replace with real endpoint when backend is ready
    // return this.httpService.get('/notifications').pipe(
    //   map((res: any) => res.data as Notification[])
    // );
    return of(this.getMockNotifications());
  }

  markAsRead(id: string): Observable<void> {
    // TODO: Replace with real endpoint
    // return this.httpService.put(`/notifications/${id}/read`, {}).pipe(map(() => void 0));
    return of(void 0);
  }

  markAllAsRead(): Observable<void> {
    // TODO: Replace with real endpoint
    // return this.httpService.put('/notifications/read-all', {}).pipe(map(() => void 0));
    return of(void 0);
  }

  private getMockNotifications(): Notification[] {
    return [
      {
        id: '1',
        title: 'Pedido enviado',
        message: 'Tu pedido #1234 ha sido enviado y llegará en 3-5 días hábiles.',
        type: 'order',
        read: false,
        createdAt: '2026-04-02T10:30:00Z',
        imageUrl: 'assets/img/notifications/order.png',
        actionUrl: '/profile/orders',
      },
      {
        id: '2',
        title: 'Oferta especial',
        message: '¡20% de descuento en electrónicos! Válido hasta el 5 de abril.',
        type: 'promotion',
        read: false,
        createdAt: '2026-04-01T15:00:00Z',
        imageUrl: 'assets/img/notifications/promo.png',
        actionUrl: '/category/electronics',
      },
      {
        id: '3',
        title: 'Nuevo mensaje del vendedor',
        message: 'El vendedor TechStore ha respondido a tu consulta.',
        type: 'info',
        read: false,
        createdAt: '2026-04-01T09:15:00Z',
      },
      {
        id: '4',
        title: 'Actualización del sistema',
        message: 'Hemos mejorado la seguridad de tu cuenta. Revisa tu configuración.',
        type: 'system',
        read: false,
        createdAt: '2026-03-30T12:00:00Z',
        actionUrl: '/profile/settings',
      },
      {
        id: '5',
        title: 'Pedido entregado',
        message: 'Tu pedido #1200 fue entregado exitosamente.',
        type: 'order',
        read: true,
        createdAt: '2026-03-28T16:45:00Z',
        imageUrl: 'assets/img/notifications/order.png',
      },
    ];
  }
}
