import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductFactoryServiceService {
  constructor() {}

  createProduct(type: string, data: any): any {
    switch (type) {
      case 'electronic':
        return { ...data, category: 'Electrónica', warranty: '2 años' };
      case 'fashion':
        return { ...data, category: 'Moda', returnPolicy: '30 días' };
      case 'home':
        return { ...data, category: 'Hogar', material: 'Madera' };
      default:
        return { ...data, category: 'General' };
    }
  }
}
