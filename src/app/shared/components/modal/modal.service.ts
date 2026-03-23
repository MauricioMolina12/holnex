import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modalRef?: ComponentRef<ModalComponent>;

  constructor(
    private appRef: ApplicationRef,
    private injector: Injector,
    private cfr: ComponentFactoryResolver
  ) {}

  open<T extends object>(
    component: Type<T>,
    config?: {
      size?: 'sm' | 'md' | 'lg';
      data?: Partial<T>;
    }
  ): ComponentRef<T> {
    const modalFactory = this.cfr.resolveComponentFactory(ModalComponent);
    this.modalRef = modalFactory.create(this.injector);

    this.appRef.attachView(this.modalRef.hostView);
    this.modalRef.changeDetectorRef.detectChanges();

    this.modalRef.instance.size = config?.size ?? 'md';
    this.modalRef.instance.close = () => this.close();

    const contentFactory = this.cfr.resolveComponentFactory(component);
    const contentRef =
      this.modalRef.instance.contentHost.createComponent(contentFactory);

    if (config?.data) {
      Object.assign(contentRef.instance, config.data);
    }

    this.appRef.attachView(this.modalRef.hostView);
    document.body.appendChild(
      (this.modalRef.hostView as EmbeddedViewRef<any>).rootNodes[0]
    );

    return contentRef;
  }

  close() {
    if (!this.modalRef) return;

    this.appRef.detachView(this.modalRef.hostView);
    this.modalRef.destroy();
    this.modalRef = undefined;
  }
}
