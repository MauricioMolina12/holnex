import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusUiMessageComponent } from './status-ui-message.component';

describe('StatusUiMessageComponent', () => {
  let component: StatusUiMessageComponent;
  let fixture: ComponentFixture<StatusUiMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusUiMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusUiMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
