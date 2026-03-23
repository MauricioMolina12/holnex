// breadcrumbs.component.ts

import { Component, computed, inject, signal } from '@angular/core';
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RouterModule,
} from '@angular/router';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
    selector: 'app-breadcrumbs',
    imports: [RouterModule],
    template: `
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <ol class="breadcrumbs__list">
        @for (crumb of breadcrumbs(); track crumb; let last = $last) {
          <li
            class="breadcrumbs__item"
            >
            @if (!last) {
              <a [routerLink]="crumb.url" class="breadcrumbs__link">{{
                crumb.label
              }}</a>
            } @else {
              <span class="breadcrumbs__current">{{ crumb.label }}</span>
            }
          </li>
        }
      </ol>
    </nav>
    `,
    styles: [
        `
      .breadcrumbs {
        font-size: 14px;
      }
      .breadcrumbs__list {
        list-style: none;
        display: flex;
        gap: 8px;
        padding: 0;
        margin: 0;
      }
      .breadcrumbs__item::after {
        content: '/';
        margin-left: 8px;
      }
      .breadcrumbs__item:last-child::after {
        content: '';
      }
      .breadcrumbs__link {
        text-decoration: none;
        color: #2563eb;
      }
      .breadcrumbs__current {
        font-weight: 600;
        color: #111827;
      }
    `,
    ]
})
export class BreadcrumbsComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private _breadcrumbs = signal<Breadcrumb[]>([]);

  breadcrumbs = computed(() => this._breadcrumbs());

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const crumbs = this.buildBreadcrumbs(this.route.root);
        this._breadcrumbs.set(crumbs);
        console.log(this._breadcrumbs());
        
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    for (const child of route.children) {
      const routeURL = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      const hasBreadcrumb = child.snapshot.data['breadcrumb'];

      if (routeURL) {
        url += `/${routeURL}`;
      }

      if (hasBreadcrumb || routeURL) {
        const label =
          child.snapshot.data['breadcrumb'] ?? this.formatLabel(routeURL);

        breadcrumbs.push({ label, url });
      }

      this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private formatLabel(value: string): string {
    return value
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }
}
