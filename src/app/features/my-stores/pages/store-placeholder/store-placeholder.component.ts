import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-store-placeholder',
  templateUrl: './store-placeholder.component.html',
  styleUrls: ['./store-placeholder.component.scss'],
})
export class StorePlaceholderComponent {
  sectionName = '';

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe((data) => {
      this.sectionName = data['sectionName'] || 'Sección';
    });
  }
}
