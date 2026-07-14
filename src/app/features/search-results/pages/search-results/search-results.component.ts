import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchFacade } from '../../facades/search.facade';
import { ProductsService } from '../../../products/services/products.service';
import { Product } from '../../../products/models/products.model';
import { SortOption } from '../../models/search.model';
import { FilterTag } from '../../../../shared/components/ui/filter-tags/filter-tags.component';
import { CheckboxFilterOption } from '../../../../shared/components/ui/checkbox-filter/checkbox-filter.component';
import { skeletonType } from '../../../../core/components/skeleton/skeleton.type.enum';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
  standalone: false,
})
export class SearchResultsComponent implements OnInit {

  searchFacade = inject(SearchFacade);
  private route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  showMobileFilters = signal(false);
  skeletonType = skeletonType;

  sortOptions: { value: SortOption; label: string }[] = [
    { value: 'relevance', label: 'Más relevantes' },
    { value: 'price_asc', label: 'Menor precio' },
    { value: 'price_desc', label: 'Mayor precio' },
    { value: 'newest', label: 'Más recientes' },
  ];

  conditionOptions: CheckboxFilterOption[] = [
    { label: 'Nuevo', value: 'Nuevo' },
    { label: 'Usado', value: 'Usado' },
  ];

  categoryOptions = computed<CheckboxFilterOption[]>(() =>
    this.searchFacade.availableCategories().map((c) => ({
      label: c.name,
      value: c.name,
      count: c.count,
    }))
  );

  activeTags = computed<FilterTag[]>(() => {
    const filters = this.searchFacade.filters();
    const tags: FilterTag[] = [];

    filters.categories.forEach((c) =>
      tags.push({ key: 'category', label: c, value: c })
    );
    if (filters.priceMin !== null || filters.priceMax !== null) {
      const label =
        filters.priceMin !== null && filters.priceMax !== null
          ? `$${filters.priceMin} - $${filters.priceMax}`
          : filters.priceMin !== null
            ? `Desde $${filters.priceMin}`
            : `Hasta $${filters.priceMax}`;
      tags.push({ key: 'price', label, value: 'price' });
    }
    if (filters.freeShipping) {
      tags.push({ key: 'freeShipping', label: 'Envío gratis', value: 'true' });
    }
    filters.condition.forEach((c) =>
      tags.push({ key: 'condition', label: c, value: c })
    );
    return tags;
  });

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const query = params['query'] || '';
      this.searchFacade.search(query);
    });
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SortOption;
    this.searchFacade.changeSort(value);
  }

  onPageChange(page: number): void {
    this.searchFacade.changePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onRemoveTag(tag: FilterTag): void {
    switch (tag.key) {
      case 'category':
        this.searchFacade.toggleCategory(tag.value);
        break;
      case 'price':
        this.searchFacade.setPriceRange(null, null);
        break;
      case 'freeShipping':
        this.searchFacade.toggleFreeShipping();
        break;
      case 'condition':
        this.searchFacade.toggleCondition(tag.value);
        break;
    }
  }

  goToProduct(product: Product): void {
    this.productsService.detailProduct(product);
  }

  toggleMobileFilters(): void {
    this.showMobileFilters.update((v) => !v);
  }
}
