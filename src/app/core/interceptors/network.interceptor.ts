import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NetworkService } from '../../shared/services/network.service';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export const networkInterceptor: HttpInterceptorFn = (req, next) => {
  // const networkService = inject(NetworkService);
  // const isOnline = navigator.onLine;

  // // networkService.setOnlineState(isOnline);

  // if (!isOnline) {
  //   return throwError(() => new HttpErrorResponse({
  //     error: 'Sin conexión',
  //     status: 0,
  //     statusText: 'Offline',
  //     url: req.url
  //   }));
  // }

  return next(req);
};
