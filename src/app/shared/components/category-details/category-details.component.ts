import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss',
  standalone: true,
  imports: []
})
export class CategoryDetailsComponent {
  @Input() category!: any;
  private route = inject(ActivatedRoute);
  name!: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('name') || '';
    });
  }
}
