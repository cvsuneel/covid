import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-ii',
  templateUrl: './form-ii.component.html',
  styleUrls: ['./form-ii.component.scss']
})
export class FormIIComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  @Input() formType: any;
  @Input() form1Data: any;
  @Input() form2Data: any;

  section3: FormGroup;
  section4: FormGroup;
  section5: FormGroup;
  section6: FormGroup;
  section7: FormGroup;

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {

    this.section3 = new FormGroup( {
      'HasTheTmBeenTestedForCovid_19': new FormControl( '' ),
      'WhatDateWasTheTmTestedForCovid_19': new FormControl( '' ),
      'WhatDateDidTheTmReceiveNotificationOfTheTestResults_19': new FormControl( '' ),
      'HasTheTmWorkedAtAnyLocationOtherThanTheirBaseLocationInTheLast14Days': new FormControl( '' ),
      'WhatWereTheTestResults': new FormControl( '' )
    } )

    this.section4  = new FormGroup( {
      'HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnIndividualWhoTestedPositiveForCovid_19': new FormControl( '' ),
      'WhatDateDidTheInfectedIndividualTestPositive': new FormControl( '' ),
      'WhatIsTheTmsRelationshipToThePersonTheyWereExposedTo': new FormControl( '' ),
      'WhatDateDidTheTmComeIntoDpcWithTheVirus': new FormControl( '' ),
      'HowDidTheTmComeIntoDpcWithTheVirus': new FormControl( '' ),
      'DoesTheTmLiveWithTheIndividualWhoTestedPositive': new FormControl( '' ),
      'IsTheTmAbleToIsolateOutsideOfTheHome': new FormControl( '' ),
      'HasTheTmHadAnyContactWithTheIndividualWhoTestedPositiveAfterThePositiveDiagnosisWasReceived': new FormControl( '' ),
      'IsTheTmStayingInASeparateRoomFromTheInfectedIndividual': new FormControl( '' ),
      'IsTheTmUtilizingASeparateBathroomFromTheInfectedIndividual': new FormControl( '' ),
      'IsTheInfectedIndividualQuarantinedToTheirOwnRoomAndNotInteractingWithAnyOtherMembersOfTheHouseholdOrPets': new FormControl( '' ),
      'IsTheTmSharingPersonalHouseholdItems_cups_Towels_Utensils_WithTheInfectedIndividual': new FormControl( '' ),
      'IsTheTmPreparing_bringingFoodToTheInfectedIndividualAndAsAResult_ComingIntoContactWithSaidIndividualAnd_orTheUtensils_plates_cupsBeingUtilizedByTheInfectedIndividual': new FormControl( '' ),
      'IsTheTmTheCaregiverForTheInfectedIndividual': new FormControl( '' ),
    } )

    this.section5 = new FormGroup( {
      'HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnyTeamMembersInThe48HoursBeforeTheyBecameSymptomaticThroughYourLastDayWorked': new FormControl( '' ),
      'PleaseListTheNamesAndDatesOfTheIndividualsTheTmCameIntoDpcWithIncludingFamilyAndFriendsWhoWorkForOreillyAutoParts': new FormControl( '' ),
      'HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnyVendorsInThe48HoursBeforeTheyBecameSymptomaticThroughYourLastDayWorked': new FormControl( '' ),
      'PleaseListTheNamesAndDateOfTheVendorsTheTmCameIntoDpcWith': new FormControl( '' ),
      'HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnyCommercialAccountsInThe48HoursBeforeTheyBecameSymptomaticThroughYourLastDayWorked': new FormControl( '' ),
      'PleaseListTheNamesAndDatesOfTheCommercialAccountsTheTmCameIntoDpcWith': new FormControl( '' ),
      'HasTheTmComeIntoDpc_within6FeetForACumulativeTotalOf15MinutesOrMoreOverA24hourPeriod_WithAnySuppliersInThe48HoursBeforeTheyBecameSymptomaticThroughYourLastDayWorked': new FormControl( '' ),
      'PleaseListTheNameAndDateOfTheSuppliersTheTmCameIntoDpcWith': new FormControl( '' ),
    } )

    this.section6 = new FormGroup( {
      'AreThePrescreeningProceduresInPlaceAtTheWorkLocation': new FormControl( '' ),
      'AreTheTeamMembersAtThisLocationFollowingTheCompanysMaskAndCleaningProtocols': new FormControl( '' ),
    } )

    this.section7 = new FormGroup( {
      'declarationCheckbox': new FormControl( '' ),
      'name': new FormControl( '' ),
      'date': new FormControl( '' )
    } )

    if( this.form2Data ) {
      if( this.form2Data.section3 ) {
        this.section3.setValue(this.form2Data.section3);
      }
      if( this.form2Data.section4 ) {
        this.section4.setValue(this.form2Data.section4);
      }
      if( this.form2Data.section5 ) {
        this.section5.setValue(this.form2Data.section5);
      }
      if( this.form2Data.section6 ) {
        this.section6.setValue(this.form2Data.section6);
      }
      if( this.form2Data.section7 ) {
        this.section7.setValue(this.form2Data.section7);
      }
    }

  }

  prev() {
    this.form2Data = {
      section3: this.section3.value,
      section4: this.section4.value,
      section5: this.section5.value,
      section6: this.section6.value,
      section7: this.section7.value
    }
    this.formSubmit.emit( { formNo: 1, formType : this.formType, form1Data: this.form1Data, form2Data: this.form2Data } );

    // let confirmDialog = this.dialog.open(ConfirmComponent, { disableClose: true, data: {message: "Are you sure you want to go to form - I", info: "Form - II data will be erased if you'll click on confirm button !"}});

    // confirmDialog.afterClosed().subscribe( res => {
    //   if( res['confirm'] ) {

    //   }
    // } )
  }

  save() {

    this.form2Data = {
      section3: this.section3.value,
      section4: this.section4.value,
      section5: this.section5.value,
      section6: this.section6.value,
      section7: this.section7.value
    }

    this.formSubmit.emit( { formNo: 2, formType : this.formType, form1Data: this.form1Data, form2Data: this.form2Data, formSubmitType: 'save' } );

  }

}
