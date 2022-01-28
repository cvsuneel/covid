import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(public commonService: CommonService) { }

  ngOnInit(): void {
  }

  

}
