import { Component, Input, OnInit } from '@angular/core';
import { SummaryShopping } from '../../models/summary-shopping';

@Component({
  selector: 'app-card-summary-shopping',
  templateUrl: './card-summary-shopping.component.html',
  styleUrl: './card-summary-shopping.component.scss',
})
export class CardSummaryShoppingComponent implements OnInit{
  @Input() summary!: SummaryShopping;

  ngOnInit(): void {    
  }

}
