import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
})
export class SearchInputComponent implements OnInit {
  constructor(private router: Router) {}

  @Output() closeWrapper = new EventEmitter<boolean>();
  closeWrapperFunction() {
    this.closeWrapper.emit(false);
  }

  ngOnInit(): void {}

  searchTerm: string = '';

  onSearch(): void {
    const query = this.searchTerm.trim();
    if (query) {
      this.router.navigate(['/search'], {
        queryParams: { query: query },
      });
    }
  }
}
