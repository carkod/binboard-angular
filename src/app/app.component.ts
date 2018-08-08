import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '../../node_modules/@angular/material';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app';

  
  constructor() {      
  }

  ngOnInit() {
  }
}
