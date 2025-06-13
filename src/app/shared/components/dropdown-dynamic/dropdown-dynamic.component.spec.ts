import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownDynamicComponent } from './dropdown-dynamic.component';

describe('DropdownDynamicComponent', () => {
  let component: DropdownDynamicComponent;
  let fixture: ComponentFixture<DropdownDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownDynamicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
