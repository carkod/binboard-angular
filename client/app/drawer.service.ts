import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable()
export class DrawerService {

  public drawer: MatSidenav;
  constructor() { 
  }
  public toggle() {
    return this.drawer.toggle();
  }
  public setDrawer(drawer: MatSidenav) {
    return this.drawer = drawer;
  }
}