import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllProducts, selectLoading } from '../../../products/store/selectors/product.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { loadProducts } from '../../../products/store/actions/product.actions';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  constructor(private route: ActivatedRoute, private store: Store) {}

  query: string = ''
  products = toSignal(this.store.select(selectAllProducts), {initialValue: []})
  loading = toSignal(this.store.select(selectLoading), {initialValue: false,});

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query']    
      this.store.dispatch(loadProducts())  
    });
  }
}
