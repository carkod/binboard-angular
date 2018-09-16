import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DrawerService } from '../services/drawer.service';
import { ApiService } from '../services/api.service';
import { DbService } from '../services/db.service';

@Component({
  selector: 'top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  pageTitle: any;
  constructor(private db: DbService, private route: ActivatedRoute, private drawerService: DrawerService) { }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.pageTitle = d.pageTitle;
    });
    this.db.getExchange().subscribe(info => {
      // console.log(info);
    })
    
  }
  toggle() {
    this.drawerService.toggle();
  }

}
