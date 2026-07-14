import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSelectedStore } from '../../store/my-stores.selectors';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: false,
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.scss'],
})
export class StoreHomeComponent implements OnInit {
  store$ = toSignal(this.store.select(selectSelectedStore));

  constructor(private store: Store) {}

  ngOnInit(): void {}
}
