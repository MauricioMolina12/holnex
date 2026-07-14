import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllStores, selectStoresLoading } from '../../store/my-stores.selectors';
import { Store as StoreModel } from '../../models/my-stores.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: false,
  selector: 'app-store-selector',
  templateUrl: './store-selector.component.html',
  styleUrls: ['./store-selector.component.scss'],
})
export class StoreSelectorComponent implements OnInit {
  stores$ = toSignal(this.store.select(selectAllStores));
  loading$ = toSignal(this.store.select(selectStoresLoading));

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  enterStore(storeModel: StoreModel): void {
    this.router.navigate(['/my-stores', storeModel.slug]);
  }

  createStore(): void {
    this.router.navigate(['/my-stores', 'new']);
  }
}
