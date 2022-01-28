import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';

import { CommonService } from 'src/app/core/common/common.service';
import { AppService } from 'src/app/core/services/app.service';
import { ApiService } from 'src/app/core/services/api.service';
import { commonInterfaces } from 'src/app/core/interfaces/commonInterfaces';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-tracing',
  templateUrl: './contact-tracing.component.html',
  styleUrls: ['./contact-tracing.component.scss']
})
export class ContactTracingComponent implements OnInit {
  public error = new BehaviorSubject<any>( null );

  public encodedId: any;
  constactTracingInfo: FormGroup;
  isLoading: boolean = false;

  constructor(
    public commonService: CommonService,
    private dialog: MatDialog,
    private appService: AppService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { };

  ngOnInit(): void {

    this.encodedId = this.route.snapshot.paramMap.get( 'encodedId' );

    this.constactTracingInfo = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contactDate: new FormControl('', [Validators.required]),
      dpcTm: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
    });

    if ( !this.commonService.selectedCase ) {
      console.log( "atob( encodedId ) :: ", atob( this.encodedId ));
    }

    this.fetchContactTracingData();
  };

  fetchContactTracingData() {

    let searchQuery = {};

    if ( this.commonService.selectedCase && this.commonService.selectedCase[ "entries.1642517612707.attributes" ] ) {
      searchQuery = {
        "entries.1642517612707.attributes": this.commonService.selectedCase[ "entries.1642517612707.attributes" ]
      };
    }

    let apiData: commonInterfaces[ "iApiDataObj" ] = {
      url: "/get_filtered_app_records",
      method: "POST",
      postData: {
        appId: '61e7c66533864300114c0342',
        searchQuery
      }
    };

    this.apiService.getAppData( apiData )
      .subscribe( ( response: any ) => {

        this.commonService.contactTracings = response['data'];

      })
  };

  get contact_tracing_fields() { return this.constactTracingInfo.controls; };

  save() {

    if ( this.constactTracingInfo.status === "INVALID" ) return;

    let userData = this.appService.getUserDataFromLocalStorage();

    let currentDateTime = moment().utc().format();

    let postData = {
      appId: "61e7c66533864300114c0342",
      assignment: {
        assignedBy: {
          department: userData.department,
          firstname: userData.firstname,
          id: userData._id,
          lastname: userData.lastname,
          username: userData.username
        },
        assignedDate: currentDateTime,
        assignee: [{
          department: "PERFEQTA",
          firstname: "Abhishek",
          id: "61d7f18533864300114bd9c7",
          lastname: "Chavda",
          username: "perfeqta_achavda"
        }],
        comments: "test assign",
        roles: [{ id: "57e54be3372ec744557b4a90", title: "Admin" }]
      },
      calendarIds: [],
      calendarverifieduser: [],
      createdByInfo: {
        department: userData.department,
        firstname: userData.firstname,
        lastname: userData.lastname,
        middlename: userData.middlename,
        username: userData.username,
        _id: userData._id
      },
      createdDateInfo: currentDateTime,
      displayAssignee: "perfeqta_achavda",
      draftStatus: 5,
      entries: {
        "1642579164059": { attributes: this.commonService.selectedCase[ "entries.1642517612707.attributes" ] }, // Ref Case Id ( Parent case id )
        "1642579166839": { attributes: this.commonService.selectedCase.createdDate }, // Created Date
        "1642579353913-1642579169209": { "1642579169209": this.constactTracingInfo.value[ "comment" ] }, // Comment
        "1642579353915-1642579169209": { "1642579169209": this.constactTracingInfo.value[ "contactDate" ] }, // Contact Date (Date Picker)
        "1642579353916-1642579169209": { "1642579169209": this.constactTracingInfo.value[ "dpcTm" ] }, // Direct Prolonged Contact by Team Members
        "1642579353917-1642579169209": { "1642579169209": this.constactTracingInfo.value[ "name" ] }, // Name
        "1642579353919-1642579169209": { "1642579169209": this.constactTracingInfo.value[ "type" ] }, // Type
        FailMesssageForQCForm: {},
        appToExpandMessage: {},
        draftStatus: 5,
        entityModel: [],
        errorAppDataStore: [],
        getUpdateEntity: {},
        isattributesadded: true,
        islinkcalendar: false,
        settings: {},
        status: {
          "1642579169209": {
            "1642579353913-1642579169209": false,
            "1642579353915-1642579169209": false,
            "1642579353916-1642579169209": false,
            "1642579353917-1642579169209": false,
            "1642579353919-1642579169209": false,
            status: 1
          },
          status: 1
        },
        tempAppDataStore: {},
        tempAppDataStoreProcMapping: {}
      },
      isRejected: false,
      lastUpdated: {
        date: currentDateTime,
        firstname: userData.firstname,
        lastname: userData.lastname,
        userId: userData._id,
        username: userData.username,
      },
      levelIds: ["61d6d6e733864300114bb98c", "61dbebdb33864300114beda7", "61dbec0e33864300114bedb7"],
      levels: [
        {
          levelId: 0,
          siteId: "61d6d6e733864300114bb98c",
          title: "USA"
        },
        {
          levelId: 1,
          siteId: "61dbebdb33864300114beda7",
          title: "Oklahoma"
        },
        {
          levelId: 2,
          siteId: "61dbec0e33864300114bedb7",
          title: "Edmond"
        }
      ],
      parentVersion: 3,
      reviewStatus: "Done",
      schemaID: "Covid19 - Contact Tracing",
      verificationDate: currentDateTime,
      workflowreview: []
    };

    console.log("postData", postData);

    const apiData = {
      url: "https://staging.beperfeqta.com/oreilly/api/entries/61e7c66533864300114c0342",
      method: "POST",
      postData: postData
    };

    this.isLoading = true;
    this.apiService.contact_tracing( apiData )
      .subscribe( ( data: any ) => {

        if ( data && data[ "_id" ] ) {

          this.fetchContactTracingData();
          this.constactTracingInfo.reset();

          this.isLoading = false;

        }

      }),
      ( err: any ) => {

        console.error( err );
        this.error.next( err );
      }
  };

};
