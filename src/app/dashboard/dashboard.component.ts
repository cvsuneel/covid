import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../core/common/common.service';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pageShowing:any = 'my-case';

  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    private route: ActivatedRoute   
  ) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        Object.keys( params ).length > 0 ? this.pageShowing = params['page'] : this.pageShowing = 'my-case';
      }
    );

  }

}
