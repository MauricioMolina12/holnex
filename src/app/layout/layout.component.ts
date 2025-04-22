import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  isClose: boolean = true;

  closeAlertNewPromotions(){
    this.isClose = false;
  }

}
