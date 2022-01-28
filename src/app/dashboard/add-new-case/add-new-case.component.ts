import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { CommonService } from 'src/app/core/common/common.service';
import { SuccessComponent } from 'src/app/core/popover-components/success/success.component';
import * as moment from 'moment';
import { AppService } from 'src/app/core/services/app.service';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-case',
  templateUrl: './add-new-case.component.html',
  styleUrls: ['./add-new-case.component.scss']
})
export class AddNewCaseComponent implements OnInit {

  formNo: any = 1;
  formType: any;
  form1Data: any;
  form2Data: any;

  forms: any;
  userData: any;

  constructor( 
    private dialog: MatDialog, 
    public commonService: CommonService, 
    private appService: AppService, 
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.forms = {
      NPSQ: {
        "title": "Symptomatic – Not Positive Questionnaire (NPSQ)"
      },
      PSQ: {
        "title": "Positive Symptomatic Questionnaire (PSQ)"
      },
      PSFQ: {
        "title": "Positive Symptom Free Questionnaire (PSFQ)"
      },
      DWSQ: {
        "title": "DPC at Work Symptomatic Questionnaire (DWSQ)"
      },
      DWSFQ: {
        "title": "DPC at Work Symptom Free Questionnaire (DWSFQ)"
      },
      DHSQ: {
        "title": "DPC at Home – Symptomatic Questionnaire (DHSQ)"
      },
      DOSFVQ: {
        "title": "DPC Other–Vacc–Symptom Free Questionnaire (DOSFVQ)"
      },
      DHSFQ: {
        "title": "DPC at Home – SF Questionnaire (DHSFQ)"
      },
      DOSQ: {
        "title": "DPC Other – Symptomatic Questionnaire (DOSQ)"
      },
      DOPPQ: {
        "title": "DPC Other–Previously Positive Questionnaire(DOPPQ)"
      },
      DOSFQ: {
        "title": "DPC Other – Symptom Free Questionnaire(DOSFQ)"
      }
    }

    this.userData = this.appService.getUserDataFromLocalStorage();

  }

  onFormChange( formDetails: any ) {
    this.formNo = formDetails.formNo;
    this.formType = formDetails.formType;
    this.form1Data = formDetails.form1Data;
    this.form2Data = formDetails.form2Data;

    if( formDetails.formSubmitType == 'save') {
      this.save();
    }
  }

  save() {

    let currentDateTime = moment().utc().format().split( "Z" )[0] + ".000Z";

    let postData = {
      "calendarIds": [],
      "calendarverifieduser": [],
      "assignment": {
        "assignee": [],
        "assignedBy": {},
        "comments": "",
        "assignedDate": currentDateTime // "2022-01-13T11:42:26.540Z"
      },
      "verificationDate": currentDateTime, // "2022-01-13T11:32:05.395Z",
      "workflowreview": [],
      "parentVersion": 11,
      "createdDateInfo": currentDateTime, // "2022-01-13T11:32:05.395Z",
      "createdByInfo": {
        "_id": this.userData._id, //"61d7f33033864300114bdf0e",
        "username": this.userData.username, //"perfeqta_sbiswal",
        "firstname": this.userData.firstname, //"Sarada",
        "middlename": "",
        "lastname": this.userData.lastname, //"Biswal",
        "department": this.userData.department //"PERFEQTA"
      },
      "entries": {
        "isattributesadded": true,
        "status": {
          "1641477868207": {
            "1641477888982-1641477868207": false,
            "status": 1
          },
          "1641476901564": {
            "1641476952968-1641476901564": false,
            "1641476968510-1641476901564": false,
            "1641476968506-1641476901564": false,
            "1641476968504-1641476901564": false,
            "1641476968507-1641476901564": false,
            "1641476968503-1641476901564": false,
            "1641476968508-1641476901564": false,
            "status": 1
          },
          "1641479156103": {
            "1641479193762-1641479156103": false,
            "1641479193766-1641479156103": false,
            "1641479193767-1641479156103": false,
            "1641479193764-1641479156103": false,
            "1641479193763-1641479156103": false,
            "1641479193760-1641479156103": false,
            "1641479193755-1641479156103": false,
            "1641479193759-1641479156103": false,
            "1641479193769-1641479156103": false,
            "1641479193758-1641479156103": false,
            "1641479193753-1641479156103": false,
            "1641479193756-1641479156103": false,
            "1641479193768-1641479156103": false,
            "1641892336252-1641479156103": false,
            "1641892361813-1641479156103": false,
            "status": 1
          },
          "1641801971477": {
            "1641548834012-1641801971477": false,
            "1641548852241-1641801971477": false,
            "1641548863455-1641801971477": false,
            "1641548871063-1641801971477": false,
            "1641548964210-1641801971477": false,
            "status": 1
          },
          "1641802015038": {
            "1641549009824-1641802015038": false,
            "1641549017677-1641802015038": false,
            "1641549025711-1641802015038": false,
            "1641549035377-1641802015038": false,
            "1641549044079-1641802015038": false,
            "status": 1
          },
          "1641802202192": {
            "1641549096388-1641802202192": false,
            "1641549108198-1641802202192": false,
            "1641549114963-1641802202192": false,
            "1641549125646-1641802202192": false,
            "1641549137196-1641802202192": false,
            "1641549156477-1641802202192": false,
            "1641549164718-1641802202192": false,
            "1641549649713-1641802202192": false,
            "1641549660584-1641802202192": false,
            "1641549703606-1641802202192": false,
            "1641549753066-1641802202192": false,
            "1641549765470-1641802202192": false,
            "1641549778334-1641802202192": false,
            "1641549793887-1641802202192": false,
            "status": 1
          },
          "1641802240743": {
            "1641549864669-1641802240743": false,
            "1641550018862-1641802240743": false,
            "1641550064648-1641802240743": false,
            "1641550084835-1641802240743": false,
            "1641550108766-1641802240743": false,
            "1641550125589-1641802240743": false,
            "1641550205175-1641802240743": false,
            "1641550213970-1641802240743": false,
            "status": 1
          },
          "1641802277927": {
            "1641550301719-1641802277927": false,
            "1641550309254-1641802277927": false,
            "1641550315522-1641802277927": false,
            "1641826209922-1641802277927": false,
            "1641826229885-1641802277927": false,
            "status": 1
          },
          "status": 1
        },
        "settings": {},
        "1641476896297": {
          "attributes": "Yes"
        },
        "1641476898677": {
          "attributes": "No"
        },
        "1641477888982-1641477868207": {
          "1641477868207": this.forms[this.formType].title
        },
        "1641476952968-1641476901564": {
          "1641476901564": this.form1Data.common2.HaveYouTestedPositiveForCovid_19
        },
        "1641476968510-1641476901564": {
          "1641476901564": this.form1Data.common2.WereYouExposedToSomeoneWhoTestedPositiveForCovid_19
        },
        "1641476968506-1641476901564": {
          "1641476901564": this.form1Data.common2.DoYouHaveSymptoms
        },
        "1641476968504-1641476901564": {
          "1641476901564": this.form1Data.common2.DirectPrologueContact
        },
        "1641476968507-1641476901564": {
          "1641476901564": this.form1Data.common2.DoYouLiveWithTheIndividualWhoTestedPositive
        },
        "1641476968503-1641476901564": {
          "1641476901564": this.form1Data.common2.AreYouFullyVaccinated
        },
        "1641476968508-1641476901564": {
          "1641476901564": this.form1Data.common2.HaveYouTestedPositiveForCovidInTheLast90Days
        },
        "1641479193762-1641479156103": {
          "1641479156103": this.form1Data.section1.name
        },
        "1641479193766-1641479156103": {
          "1641479156103": this.form1Data.section1.tmNumber
        },
        "1641479193767-1641479156103": {
          "1641479156103": this.form1Data.section1.workLocation
        },
        "1641479193764-1641479156103": {
          "1641479156103": this.form1Data.section1.designation
        },
        "1641479193763-1641479156103": {
          "1641479156103": this.form1Data.section1.phone
        },
        "1641479193760-1641479156103": {
          "1641479156103": this.form1Data.section1.email
        },
        "1641479193755-1641479156103": {
          "1641479156103": this.form1Data.section1.CovidVaccineReceived
        },
        "1641479193759-1641479156103": {
          "1641479156103": this.form1Data.section1.WhatDateDidTheTmReceiveTheFinalDoseOfTheVaccine ? moment ( new Date( this.form1Data.section1.WhatDateDidTheTmReceiveTheFinalDoseOfTheVaccine ) ).utc().format() : "" //"2021-12-25T18:30:00.000Z"
        },
        "1641479193769-1641479156103": {
          "1641479156103": this.form1Data.section1.VaccineManufacturer
        },
        "1641479193758-1641479156103": {
          "1641479156103": this.form1Data.section1.WhatDateDidTheTmPreviouslyTestPositiveForCovid_19 ? moment ( new Date( this.form1Data.section1.WhatDateDidTheTmPreviouslyTestPositiveForCovid_19 ) ).utc().format() : "" //"2022-01-10T18:30:00.000Z"
        },
        "1641479193753-1641479156103": {
          "1641479156103": this.form1Data.section1.DidTheTmHaveSymptomsDuringTheirPriorCovidCase
        },
        "1641479193756-1641479156103": {
          "1641479156103": this.form1Data.section1.WhatDateDidTheirSymptomsStart ? moment( new Date( this.form1Data.section1.WhatDateDidTheirSymptomsStart ) ).utc().format() : "" //"2022-01-11T18:30:00.000Z"
        },
        "1641479193768-1641479156103": {
          "1641479156103": this.form1Data.section1.WhatWasTheTmsLastDayWorked ? moment( new Date( this.form1Data.section1.WhatWasTheTmsLastDayWorked ) ).utc().format() : "" //"2022-01-12T18:30:00.000Z"
        },
        "1641892336252-1641479156103": {
          "1641479156103": this.form1Data.section1.HasTheTmWorkedAtAnyLocationOtherThanTheirBaseLocationInTheLast14Days
        },
        "1641892361813-1641479156103": {
          "1641479156103": this.form1Data.section1.HasTheTmVisitedOtherPlacesInTheLastTwoWeeksOutsideOfWorkAndHome
        },
        "1641548834012-1641801971477": {
          "1641801971477": this.form1Data.section2.WhenDidTheTmBecomeSymptomatic ? moment( new Date( this.form1Data.section2.WhenDidTheTmBecomeSymptomatic ) ).utc().format() : "" // "2022-01-12T18:30:00.000Z"
        },
        "1641548863455-1641801971477": {
          "1641801971477": this.form1Data.section2.DidTheTmWorkWhileSymptomatic
        },
        "1641548871063-1641801971477": {
          "1641801971477": this.form1Data.section2.WhatDatesDidTheTmWorkWhileSymptomatic ? moment( new Date( this.form1Data.section2.WhatDatesDidTheTmWorkWhileSymptomatic ) ).utc().format() : "" // "2022-01-12T18:30:00.000Z"
        },
        "1641548964210-1641801971477": {
          "1641801971477": this.form1Data.section2.WhyDidTheTmWorkWhileSymptomatic
        },
        "1641549009824-1641802015038": {
          "1641802015038": this.form2Data.section3.HasTheTmBeenTestedForCovid_19
        },
        "1641549017677-1641802015038": {
          "1641802015038": this.form2Data.section3.WhatDateDidTheTmReceiveNotificationOfTheTestResults_19 ? moment( new Date( this.form2Data.section3.WhatDateDidTheTmReceiveNotificationOfTheTestResults_19 ) ).utc().format() : "" // "2022-01-08T18:30:00.000Z"
        },
        "1641549025711-1641802015038": {
          "1641802015038": this.form2Data.section3.WhatDateWasTheTmTestedForCovid_19 ? moment( new Date( this.form2Data.section3.WhatDateWasTheTmTestedForCovid_19 ) ).utc().format() : "" // "2022-01-07T18:30:00.000Z"
        },
        "1641549035377-1641802015038": {
          "1641802015038": this.form2Data.section3.HasTheTmWorkedAtAnyLocationOtherThanTheirBaseLocationInTheLast14Days
        },
        "1641549044079-1641802015038": {
          "1641802015038": this.form2Data.section3.WhatWereTheTestResults
        },
        "1641549096388-1641802202192": {
          "1641802202192": this.form2Data.section4.HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnIndividualWhoTestedPositiveForCovid_19
        },
        "1641549108198-1641802202192": {
          "1641802202192": this.form2Data.section4.WhatIsTheTmsRelationshipToThePersonTheyWereExposedTo
        },
        "1641549114963-1641802202192": {
          "1641802202192": this.form2Data.section4.WhatDateDidTheTmComeIntoDpcWithTheVirus ? moment( new Date( this.form2Data.section4.WhatDateDidTheTmComeIntoDpcWithTheVirus ) ).utc().format() : "" // "2022-01-03T18:30:00.000Z"
        },
        "1641549125646-1641802202192": {
          "1641802202192": this.form2Data.section4.HowDidTheTmComeIntoDpcWithTheVirus
        },
        "1641549137196-1641802202192": {
          "1641802202192": this.form2Data.section4.DoesTheTmLiveWithTheIndividualWhoTestedPositive,
        },
        "1641549156477-1641802202192": {
          "1641802202192": this.form2Data.section4.WhatDateDidTheInfectedIndividualTestPositive ? moment( new Date( this.form2Data.section4.WhatDateDidTheInfectedIndividualTestPositive ) ).utc().format() : "" // "2022-01-14T18:30:00.000Z"
        },
        "1641549164718-1641802202192": {
          "1641802202192": this.form2Data.section4.IsTheTmAbleToIsolateOutsideOfTheHome
        },
        "1641549649713-1641802202192": {
          "1641802202192": this.form2Data.section4.HasTheTmHadAnyContactWithTheIndividualWhoTestedPositiveAfterThePositiveDiagnosisWasReceived
        },
        "1641549660584-1641802202192": {
          "1641802202192": this.form2Data.section4.IsTheTmStayingInASeparateRoomFromTheInfectedIndividual
        },
        "1641549703606-1641802202192": {
          "1641802202192": this.form2Data.section4.IsTheTmUtilizingASeparateBathroomFromTheInfectedIndividual
        },
        "1641549753066-1641802202192": {
          "1641802202192": this.form2Data.section4.IsTheInfectedIndividualQuarantinedToTheirOwnRoomAndNotInteractingWithAnyOtherMembersOfTheHouseholdOrPets
        },
        "1641549765470-1641802202192": {
          "1641802202192": this.form2Data.section4.IsTheTmSharingPersonalHouseholdItems_cups_Towels_Utensils_WithTheInfectedIndividual
        },
        "1641549778334-1641802202192": {
          "1641802202192": this.form2Data.section4.IsTheTmPreparing_bringingFoodToTheInfectedIndividualAndAsAResult_ComingIntoContactWithSaidIndividualAnd_orTheUtensils_plates_cupsBeingUtilizedByTheInfectedIndividual
        },
        "1641549793887-1641802202192": {
          "1641802202192": this.form2Data.section4.IsTheTmTheCaregiverForTheInfectedIndividual
        },
        "1641549864669-1641802240743": {
          "1641802240743": this.form2Data.section5.HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnyTeamMembersInThe48HoursBeforeTheyBecameSymptomaticThroughYourLastDayWorked
        },
        "1641550018862-1641802240743": {
          "1641802240743": this.form2Data.section5.PleaseListTheNamesAndDatesOfTheIndividualsTheTmCameIntoDpcWithIncludingFamilyAndFriendsWhoWorkForOreillyAutoParts
        },
        "1641550064648-1641802240743": {
          "1641802240743": this.form2Data.section4.HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnIndividualWhoTestedPositiveForCovid_19
        },
        "1641550084835-1641802240743": {
          "1641802240743": this.form2Data.section5.PleaseListTheNamesAndDateOfTheVendorsTheTmCameIntoDpcWith
        },
        "1641550108766-1641802240743": {
          "1641802240743": this.form2Data.section5.HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnyCommercialAccountsInThe48HoursBeforeTheyBecameSymptomaticThroughYourLastDayWorked
        },
        "1641550125589-1641802240743": {
          "1641802240743": this.form2Data.section5.PleaseListTheNamesAndDatesOfTheCommercialAccountsTheTmCameIntoDpcWith
        },
        "1641550205175-1641802240743": {
          "1641802240743": this.form2Data.section5.HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnySuppliersInThe48HoursBeforeTheyBecameSymptomaticThroughYourLastDayWorked
        },
        "1641550213970-1641802240743": {
          "1641802240743": this.form2Data.section5.PleaseListTheNameAndDateOfTheSuppliersTheTmCameIntoDpcWith
        },
        "1641550301719-1641802277927": {
          "1641802277927": this.form2Data.section6.AreThePrescreeningProceduresInPlaceAtTheWorkLocation
        },
        "1641550309254-1641802277927": {
          "1641802277927": this.form2Data.section6.AreTheTeamMembersAtThisLocationFollowingTheCompanysMaskAndCleaningProtocols
        },
        "1641826209922-1641802277927": {
          "1641802277927": this.form2Data.section7.name
        },
        "1641826229885-1641802277927": {
          "1641802277927": this.form2Data.section7.date ? moment( new Date( this.form2Data.section7.date ) ).utc().format() : "" // "2022-01-12T18:30:00.000Z"
        },
        "draftStatus": 5,
        "islinkcalendar": false,
        "FailMesssageForQCForm": {},
        "entityModel": [],
        "tempAppDataStore": {},
        "appToExpandMessage": {},
        "tempAppDataStoreProcMapping": {},
        "getUpdateEntity": {},
        "1641548852241-1641801971477": {
          "1641801971477": this.form1Data.section2.WhatAreTheTmsSymptoms
        },
        "1641550315522-1641802277927": {
          "1641802277927": [
            this.form2Data.section7.declarationCheckbox ? "Yes" : "No"
          ]
        },
        "errorAppDataStore": []
      },
      "levels": [
        {
          "levelId": 0,
          "siteId": "61d6d6e733864300114bb98c",
          "title": "USA"
        },
        {
          "levelId": 1,
          "siteId": "61dbebdb33864300114beda7",
          "title": "Oklahoma"
        },
        {
          "levelId": 2,
          "siteId": "61dbec0e33864300114bedb7",
          "title": "Edmond"
        }
      ],
      "levelIds": [
        "61d6d6e733864300114bb98c",
        "61dbebdb33864300114beda7",
        "61dbec0e33864300114bedb7"
      ],
      "appId": "61d6f3dc33864300114bbdb4",
      "draftStatus": 5,
      "reviewStatus": "Done",
      "schemaID": "COVID19 Management",
      "displayAssignee": "",
      "isRejected": false,
      "lastUpdated": {
        "userId": this.userData._id, //"61d7f33033864300114bdf0e",
        "date": currentDateTime, //"2022-01-13T11:42:26.540Z",
        "username": this.userData.username, // "perfeqta_sbiswal",
        "firstname": this.userData.firstname, //"Sarada",
        "lastname": this.userData.lastname //"Biswal"
      },
      "oreilly_data" : this.userData.oreilly_data
    }
    
    this.apiService.add_new_case( postData )
    .subscribe( (data: any) => {

      this.router.navigate( ['/dashboard'] )

    } ),
    ( err: any ) => {

      console.log( err )

    }

    // this.dialog.open(SuccessComponent, { disableClose: true, data: {message: "New case registered successfully !"}});

  }

}
