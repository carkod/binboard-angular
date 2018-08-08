import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '../../../node_modules/@angular/material';
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit{

  @ViewChild('drawer') public drawer: MatSidenav;
  isHandset$: true;
    
  constructor(private drawerService: DrawerService) {}
  
  ngOnInit() {
    this.drawerService.setDrawer(this.drawer);
  }
  
  }
