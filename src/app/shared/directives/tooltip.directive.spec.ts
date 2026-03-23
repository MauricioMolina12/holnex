import { ElementRef, Renderer2 } from '@angular/core';
import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  it('should create an instance', () => {
    const elRef = { nativeElement: document.createElement('div') } as ElementRef;
    const renderer = jasmine.createSpyObj<Renderer2>('Renderer2', ['createElement', 'appendChild', 'setStyle', 'removeChild']);
    const directive = new TooltipDirective(elRef, renderer);
    expect(directive).toBeTruthy();
  });
});
