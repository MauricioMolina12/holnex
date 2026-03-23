import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-profile-seller',
    templateUrl: './card-profile-seller.component.html',
    styleUrl: './card-profile-seller.component.scss',
    standalone: false
})
export class CardProfileSellerComponent {

  @Input() seller!: {name: string; image: string; cover?: string; description: string};
}
