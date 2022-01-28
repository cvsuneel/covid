import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/core/common/common.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-case-history',
  templateUrl: './case-history.component.html',
  styleUrls: ['./case-history.component.scss']
})
export class CaseHistoryComponent implements OnInit {

  public err = new BehaviorSubject<any>(null);
  
  public encodedId: any;
  private documentId: any;
  private schemaId: any;

  caseHistory: any = [];
  public isLoading = false;

  constructor(
    public commonService: CommonService,
    private route: ActivatedRoute,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {

    this.encodedId = this.route.snapshot.paramMap.get( 'encodedId' );
    this.documentId = atob( this.encodedId );
    this.schemaId = "61d6f3dc33864300114bbdb4";

    this.isLoading = true;
    this.apiService.getCaseHistory( this.schemaId, this.documentId )
    .subscribe( ( response: any ) => {
      
      this.caseHistory = response;
      this.isLoading = false;

    } ),
    ( error: any ) => {

      this.err.next( error );
    
    }

  }

}
