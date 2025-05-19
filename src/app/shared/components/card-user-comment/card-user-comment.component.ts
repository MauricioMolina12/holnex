import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-user-comment',
  standalone: true,
  templateUrl: './card-user-comment.component.html',
  styleUrl: './card-user-comment.component.scss'
})
export class CardUserCommentComponent {

  @Input() user: {name: string; image: string; time: string; comment: string} = {name: '', image: '', time: '', comment:''}
}
