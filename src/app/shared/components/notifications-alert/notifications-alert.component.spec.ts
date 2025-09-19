import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsAlertComponent } from './notifications-alert.component';

describe('NotificationsAlertComponent', () => {
  let component: NotificationsAlertComponent;
  let fixture: ComponentFixture<NotificationsAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotificationsAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
