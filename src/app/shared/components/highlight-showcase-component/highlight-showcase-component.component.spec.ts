import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightShowcaseComponentComponent } from './highlight-showcase-component.component';

describe('HighlightShowcaseComponentComponent', () => {
  let component: HighlightShowcaseComponentComponent;
  let fixture: ComponentFixture<HighlightShowcaseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HighlightShowcaseComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HighlightShowcaseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
