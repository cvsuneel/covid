import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { caseInterfaces } from 'src/app/core/interfaces/caseInterefaces';
import { CommonService } from 'src/app/core/common/common.service';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { commonInterfaces } from 'src/app/core/interfaces/commonInterfaces';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-myteams-cases',
  templateUrl: './myteams-cases.component.html',
  styleUrls: ['./myteams-cases.component.scss']
})
export class MyteamsCasesComponent implements OnInit {
  isLoading = false;
  p: number = 1;
  count: number = 5;
  itemsPerPage = 10;
  startDate = new FormControl();
  endDate = new FormControl();


  displayedColumns: any = [];
  dataSource: any;

  columns: any = [];
  role: string = "";

  shouldShowContactTracing: boolean = false;


  constructor(
    public commonService: CommonService,
    private apiService: ApiService,
    public authService: AuthService,
    public appService: AppService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.role = this.appService.getUserRole();

    if ( this.role === "Admin" || this.role === "Supervisor" || this.role === "Manager" || this.role === "HR" ) {

      this.shouldShowContactTracing = true;
    }

      this.displayedColumns = [
        {
          "seq": "entries.1642517612707.attributes",
          "title": "CaseID",
          "type": {
            "_id": "5a8685437853c7588ee49bc5",
            "title": "Auto Generate",
            "format": {
              "_id": "122256789012345678902234",
              "title": "None",
              "metadata": {}
            }
          },
          "s#": "1642517612707",
          "parentId": "attributes",
          "priority": false,
          "isSystemField": false,
          "isSecureField": false,
          "arguments": {
            "title": "CaseID",
            "s#": "1642517612707",
            "type": {
              "_id": "5a8685437853c7588ee49bc5",
              "title": "Auto Generate",
              "format": {
                "_id": "122256789012345678902234",
                "title": "None",
                "metadata": {}
              }
            },
            "isHippaAttribute": false,
            "priority": false
          },
          "version": 15,
          "methodName": "attribute"
        },
        {
          "seq": "entries.1641479193766-1641479156103.1641479156103",
          "title": "Tm Number",
          "type": {
            "_id": "57175257c74217130039948c",
            "title": "Textbox",
            "format": {
              "_id": "123456789912345678901234",
              "title": "None",
              "metadata": {}
            }
          },
          "s#": "1641479193766",
          "parentId": "1641479156103",
          "priority": false,
          "isSystemField": false,
          "isSecureField": false,
          "arguments": {
            "title": "What is the TM's team member number? Q11.P3",
            "s#": "1641479193766",
            "type": {
              "_id": "57175257c74217130039948c",
              "title": "Textbox",
              "format": {
                "_id": "123456789912345678901234",
                "title": "None",
                "metadata": {}
              }
            },
            "parentId": "1641479156103",
            "isHippaQuestion": false,
            "priority": false
          },
          "version": 15,
          "methodName": "procedureQuestion"
        },
        {
          "seq": "createdDate",
          "title": "Created Date",
          "type": {
            "format": {
              "title": "Date",
              "metadata": {
                "format": "MM/dd/yyyy HH:mm:ss"
              }
            }
          },
          "s#": "createdDate",
          "parentId": "createdDate",
          "priority": true,
          "isSystemField": false,
          "methodName": "createdDate"
        },
        {
          "seq": "entries.1641479193762-1641479156103.1641479156103",
          "title": "Name",
          "type": {
            "_id": "57175257c74217130039948c",
            "title": "Textbox",
            "format": {
              "_id": "123456789912345678901234",
              "title": "None",
              "metadata": {}
            }
          },
          "s#": "1641479193762",
          "parentId": "1641479156103",
          "priority": false,
          "isSystemField": false,
          "isSecureField": false,
          "arguments": {
            "title": "What is the TM's name? Q8.P3",
            "s#": "1641479193762",
            "type": {
              "_id": "57175257c74217130039948c",
              "title": "Textbox",
              "format": {
                "_id": "123456789912345678901234",
                "title": "None",
                "metadata": {}
              }
            },
            "parentId": "1641479156103",
            "isHippaQuestion": false,
            "priority": false
          },
          "version": 15,
          "methodName": "procedureQuestion"
        },
        {
          "seq": "modifiedDate",
          "title": "Modified Date",
          "type": {
            "format": {
              "title": "Date",
              "metadata": {
                "format": "MM/dd/yyyy HH:mm:ss"
              }
            }
          },
          "s#": "modifiedDate",
          "parentId": "modifiedDate",
          "priority": true,
          "isSystemField": false,
          "methodName": "modifiedDate"
        },
        {
          "seq": "modifiedByName",
          "title": "Modified By",
          "type": "user",
          "s#": "modifiedByName",
          "searchIn": "mona",
          "parentId": "modifiedByName",
          "priority": true,
          "isSystemField": false,
          "methodName": "modifiedByName"
        }
      ];

    let fetchAppDataCondition;

    if ( this.role === "Team Member" ) {

      fetchAppDataCondition = {
        'oreilly_data.supervisor_tm_no': this.appService.getUserSupervisorNo()
      }

    }
    else if ( this.role === "Supervisor" ) {

      fetchAppDataCondition = {
        'oreilly_data.supervisor_tm_no': this.appService.getUserTmNo()
      }

    }
    else if ( this.role === "Manager" ) {

      fetchAppDataCondition = {
        'oreilly_data.manager_tm_no': this.appService.getUserTmNo()
      }

    }
    else if ( this.role === "HR" ) {

      fetchAppDataCondition = {
        'oreilly_data.hr_tm_no': this.appService.getUserTmNo()
      }

    }
    else {

      fetchAppDataCondition = {};

    }


    let apiData: commonInterfaces[ "iApiDataObj" ] = {
      url: "/get_filtered_app_records",
      method: "POST",
      postData: {
        appId: '61d6f3dc33864300114bbdb4',
        searchQuery: fetchAppDataCondition
      }
    };

    this.isLoading = true;

    this.apiService.getAppData( apiData )
      .subscribe( ( response: any ) => {

        this.isLoading = false;

        this.dataSource = response['data'];

      })

  }

  viewCaseDetails( id: any ) {
    this.router.navigate( [ '/dashboard/case-details/' + btoa( id ) ] );
  }

  onContactTracingClick( caseDetails: caseInterfaces[ "iCaseData" ] ) {

    console.log( "caseDetails", caseDetails );
    this.commonService.selectedCase = caseDetails;
    this.router.navigate( ['/dashboard/contact-tracing/' + btoa( caseDetails._id as string ) ] );
  }
}
