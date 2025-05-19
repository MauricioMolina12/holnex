import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserCommentComponent } from './card-user-comment.component';

describe('CardUserCommentComponent', () => {
  let component: CardUserCommentComponent;
  let fixture: ComponentFixture<CardUserCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardUserCommentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUserCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
