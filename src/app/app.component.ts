import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  implements OnInit{
  title = 'Horizon';

  constructor(private appService: AppService){
  }

  ngOnInit(): void {
    this.appService.startApp()
  }
}
