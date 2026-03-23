import { Component, computed, inject, signal } from '@angular/core';
import { GlobalLoaderService } from '../../services/global-loader.service';

@Component({
    selector: 'app-global-loader',
    template: `
    @if (isVisible()) {
      <div class="global-loader">
        <iframe src="assets/logo-holnex.svg"></iframe>
      </div>
    }
    `,
    styleUrls: ['./global-loader.component.scss'],
    standalone: false
})
export class GlobalLoaderComponent {
  private globalLoader = inject(GlobalLoaderService);
  isVisible = computed(() => this.globalLoader.isVisible());
}
