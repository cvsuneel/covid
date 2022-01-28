import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/core/common/common.service';

@Component({
  selector: 'app-form-i',
  templateUrl: './form-i.component.html',
  styleUrls: ['./form-i.component.scss']
})
export class FormIComponent implements OnInit {

  @Output() formSubmit = new EventEmitter();
  @Input() _formType: any;
  @Input() form1Data: any;
  @Input() form2Data: any;

  common1: FormGroup;
  common2: FormGroup;
  section1: FormGroup;
  section2: FormGroup;

  conditions: any = {
    common1_AreYouCompletingTheQuestionnaireForOneOfYourDirectReports: false
  };

  formType: any;

  constructor( public commonService: CommonService ) { } 

  ngOnInit(): void {

    this.common1 = new FormGroup( {
      'AreYouCompletingTheQuestionnaireForYourself': new FormControl( '', [ Validators.required ] ),
      'AreYouCompletingTheQuestionnaireForOneOfYourDirectReports': new FormControl( '' )
    } )
  
    this.common2 = new FormGroup( {
      'HaveYouTestedPositiveForCovid_19': new FormControl( '', [ Validators.required ] ),
      'WereYouExposedToSomeoneWhoTestedPositiveForCovid_19': new FormControl( '', [ Validators.required ] ),
      'DoYouHaveSymptoms': new FormControl( '', [ Validators.required ] ),
      'DirectPrologueContact': new FormControl( ''),
      'DoYouLiveWithTheIndividualWhoTestedPositive': new FormControl( ''),
      'AreYouFullyVaccinated': new FormControl( ''),
      'HaveYouTestedPositiveForCovidInTheLast90Days': new FormControl( '')
    } )
  
    this.section1 = new FormGroup( {
      'name': new FormControl( '' ),
      'tmNumber': new FormControl( '' ),
      'workLocation': new FormControl( '' ),
      'designation': new FormControl( '' ),
      'phone': new FormControl( '' ),
      'email': new FormControl( '' ),
      'CovidVaccineReceived': new FormControl( '' ),
      'ConfirmEmail': new FormControl( '' ),
      'WhatDateDidTheTmReceiveTheFinalDoseOfTheVaccine': new FormControl( '' ),
      'WhatWasTheTmsLastDayWorked': new FormControl( '' ),
      'VaccineManufacturer': new FormControl( '' ),
      'HasTheTmWorkedAtAnyLocationOtherThanTheirBaseLocationInTheLast14Days': new FormControl( '' ),
      'HasTheTmVisitedOtherPlacesInTheLastTwoWeeksOutsideOfWorkAndHome': new FormControl( '' ),
      'WhatDateDidTheTmPreviouslyTestPositiveForCovid_19': new FormControl( '' ),
      'DidTheTmHaveSymptomsDuringTheirPriorCovidCase': new FormControl( '' ),
      'WhatDateDidTheirSymptomsStart': new FormControl( '' )

    } )
  
    this.section2 = new FormGroup( {
      'WhenDidTheTmBecomeSymptomatic': new FormControl( '' ),
      'WhatAreTheTmsSymptoms': new FormControl( [] ),
      'DidTheTmWorkWhileSymptomatic': new FormControl( '' ),
      'WhatDatesDidTheTmWorkWhileSymptomatic': new FormControl( '' ),
      'WhyDidTheTmWorkWhileSymptomatic': new FormControl( '' )
  
    } )

    if( this._formType ){
      this.formType = this._formType;
    }

    if( this.form1Data ) {

      if( this.form1Data.common1 ) {
        this.common1.setValue( this.form1Data.common1 );
      }
      if( this.form1Data.common2 ) {
        this.common2.setValue( this.form1Data.common2 );
      }
      if( this.form1Data.section1 ) {
        this.section1.setValue( this.form1Data.section1 );
      }
      if( this.form1Data.section2 ) {
        this.section2.setValue( this.form1Data.section2 );
      }
    }
  }

  get common1Form() { return this.common1.controls; }
  get common2Form() { return this.common2.controls; }

  common1FormAction() {

    if( this.common1Form['AreYouCompletingTheQuestionnaireForYourself'].value === 'no' ) {
      this.conditions.common1_AreYouCompletingTheQuestionnaireForOneOfYourDirectReports = true
    }
    else { 
      this.conditions.common1_AreYouCompletingTheQuestionnaireForOneOfYourDirectReports = false;
      this.common1.controls['AreYouCompletingTheQuestionnaireForOneOfYourDirectReports'].setValue( '' );
    }

  }

  common2FormAction() {

    if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
        && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'no'
          && this.common2Form['DoYouHaveSymptoms'].value === 'yes' ) {
            // 1
            this.formType = 'NPSQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'yes' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'no'
                && this.common2Form['DoYouHaveSymptoms'].value === 'yes' ) { 
                  // 2
                  this.formType = 'PSQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'yes' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'no'
                && this.common2Form['DoYouHaveSymptoms'].value === 'no' ) { 
                  // 3
                  this.formType = 'PSFQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && this.common2Form['DoYouHaveSymptoms'].value === 'yes'
                  && this.common2Form['DirectPrologueContact'].value === 'yes'
                    && this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'no' ) { 
                    // 4
                  this.formType = 'DWSQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && this.common2Form['DoYouHaveSymptoms'].value === 'no'
                  && this.common2Form['DirectPrologueContact'].value === 'yes' 
                    && this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'no'
                      && ( this.common2Form['AreYouFullyVaccinated'].value === 'yes' || this.common2Form['AreYouFullyVaccinated'].value === 'no' )
                        && ( this.common2Form['HaveYouTestedPositiveForCovidInTheLast90Days'].value === 'yes' ||  this.common2Form['HaveYouTestedPositiveForCovidInTheLast90Days'].value === 'no' ) ){ 
                    // 5
                  this.formType = 'DWSFQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && this.common2Form['DoYouHaveSymptoms'].value === 'yes'
                  && this.common2Form['DirectPrologueContact'].value === 'no' 
                    && this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'yes' ) { 
                      // 6
                  this.formType = 'DHSQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && this.common2Form['DoYouHaveSymptoms'].value === 'no'
                  && this.common2Form['DirectPrologueContact'].value === 'no' 
                    && ( this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'no' || this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'yes' )
                      && this.common2Form['AreYouFullyVaccinated'].value === 'yes' ) { 
                      // 7
                  this.formType = 'DOSFVQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && this.common2Form['DoYouHaveSymptoms'].value === 'no'
                  && this.common2Form['DirectPrologueContact'].value === 'no' 
                    && this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'yes'
                      && ( this.common2Form['AreYouFullyVaccinated'].value === 'yes' || this.common2Form['AreYouFullyVaccinated'].value === 'no' )
                        && ( this.common2Form['HaveYouTestedPositiveForCovidInTheLast90Days'].value === 'yes' ||  this.common2Form['HaveYouTestedPositiveForCovidInTheLast90Days'].value === 'no' ) ) { 
                      // 8
                  this.formType = 'DHSFQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && this.common2Form['DoYouHaveSymptoms'].value === 'yes'
                  && this.common2Form['DirectPrologueContact'].value === 'no' 
                    && this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'no' ) { 
                      // 9
                  this.formType = 'DOSQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && ( this.common2Form['DoYouHaveSymptoms'].value === 'yes' || this.common2Form['DoYouHaveSymptoms'].value === 'no' )
                  && this.common2Form['DirectPrologueContact'].value === 'no' 
                    && this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'no'
                      && ( this.common2Form['AreYouFullyVaccinated'].value === 'yes' || this.common2Form['AreYouFullyVaccinated'].value === 'no')
                        && this.common2Form['HaveYouTestedPositiveForCovidInTheLast90Days'].value === 'yes' ) { 
                      // 10
                  this.formType = 'DOPPQ';
    }
    else if( this.common2Form['HaveYouTestedPositiveForCovid_19'].value === 'no' 
              && this.common2Form['WereYouExposedToSomeoneWhoTestedPositiveForCovid_19'].value === 'yes'
                && this.common2Form['DoYouHaveSymptoms'].value === 'no'
                  && this.common2Form['DirectPrologueContact'].value === 'no' 
                    && ( this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'yes' || this.common2Form['DoYouLiveWithTheIndividualWhoTestedPositive'].value === 'no' ) ) { 
                      // 11
                  this.formType = 'DOSFQ';
    }


  }

  next() {

    let form1Data = {
      section1: this.section1.value,
      section2: this.section2.value,
      common1: this.common1.value,
      common2: this.common2.value,
    }

    if( ! this.formType ) {

      alert( "Please choose basic questions" );
      return;

    }

    this.formSubmit.emit( { formNo: 2, formType : this.formType, form1Data: form1Data, form2Data: this.form2Data } );

  }
}
