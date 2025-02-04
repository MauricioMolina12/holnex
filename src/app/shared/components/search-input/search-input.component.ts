import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class SearchInputComponent {
  
  @Output() closeWrapper = new EventEmitter<boolean>(); 

  closeWrapperFunction(){
    this.closeWrapper.emit(false);
  }
}
