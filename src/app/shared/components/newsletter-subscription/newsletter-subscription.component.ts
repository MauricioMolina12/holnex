import { Component } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-newsletter-subscription',
  templateUrl: './newsletter-subscription.component.html',
  standalone: true,
  imports: [ButtonComponent],
  styleUrl: './newsletter-subscription.component.scss'
})
export class NewsletterSubscriptionComponent {

}
