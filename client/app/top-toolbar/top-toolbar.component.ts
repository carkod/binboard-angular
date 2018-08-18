import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute } from '../../../node_modules/@angular/router';
import { DrawerService } from '../drawer.service';

@Component({
  selector: 'top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  pageTitle: any;
  constructor(private route: ActivatedRoute, private drawerService: DrawerService) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.pageTitle = d.pageTitle;
    });
    
  }
  toggle() {
    this.drawerService.toggle();
  }

}
