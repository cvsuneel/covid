import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CommonService } from 'src/app/core/common/common.service';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  public err = new BehaviorSubject<any>(null);
  public showLoader: boolean = false;

  public encodedId: any;
  documentId: any;
  schemaId: any;

  schemaDetails: any;
  caseDetails: any;
  isLoading: boolean;

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

    this.apiService.getCaseDetails( this.schemaId, this.documentId )
    .subscribe( response => {

      this.isLoading = false;
      this.schemaDetails = response[0];
      this.caseDetails = response[1];
      
    } ),
    ( error: any ) => {

      this.err.next( error );

    }
  }



}
