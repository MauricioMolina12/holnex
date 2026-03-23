import { Component, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'app-modal',
    template: `
    <div class="modal-backdrop" (click)="close()"></div>

    <section class="modal" [ngClass]="size">
      <ng-template #contentHost></ng-template>
    </section>
  `,
    styleUrl: './modal.component.scss',
    standalone: false
})
export class ModalComponent {
  @ViewChild('contentHost', { read: ViewContainerRef })
  contentHost!: ViewContainerRef;

  size: 'sm' | 'md' | 'lg' = 'md';

  close!: () => void;
}
