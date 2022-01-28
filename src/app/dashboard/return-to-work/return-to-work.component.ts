import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/core/common/common.service';
import { ErrorComponent } from 'src/app/core/error/error.component';
import { SuccessComponent } from 'src/app/core/popover-components/success/success.component';

@Component({
  selector: 'app-return-to-work',
  templateUrl: './return-to-work.component.html',
  styleUrls: ['./return-to-work.component.scss']
})
export class ReturnToWorkComponent implements OnInit {

  public encodedId: any;
  conditions:any;
  selectedQuestions: any = [];
  ETOM: any;


  constructor(
    public commonService: CommonService, 
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.encodedId = this.route.snapshot.paramMap.get( 'encodedId' );

    this.selectedQuestions.push( 'question_1' );

    this.conditions = { 
      question_1  : true,
      question_2	:	false,
      question_3	:	false,
      question_4	:	false,
      question_5	:	false,
      question_6	:	false,
      question_7	:	false,
      question_8	:	false,
      question_9	:	false,
      question_10	:	false,
      question_11	:	false,
      question_12	:	false,
      question_13	:	false,
      question_14	:	false,
      question_15	:	false,
      question_16	:	false,
      question_17	:	false,
      question_18	:	false,
      question_19	:	false,
      question_20	:	false,
      question_21	:	false,
      question_22	:	false,
      question_23	:	false,
      question_24	:	false,
      question_25	:	false,
      question_26	:	false,
      question_27	:	false,
      question_28	:	false,
      question_29	:	false,
      question_30	:	false	
    } ;
  }

  disp_other_que( event: any, que_id: any, true_que: any, false_que: any ) {

    let currentQueIndex = this.selectedQuestions.indexOf( que_id );
    if( currentQueIndex > -1 ) {
      for( let i = currentQueIndex + 1; i < this.selectedQuestions.length; i++ ) {
        this.conditions[this.selectedQuestions[i]] = false;
      }
      this.ETOM = false;
    }

    this.selectedQuestions.length = currentQueIndex + 1;

    if( event.target.value == 'yes' )
    {
      if( true_que == 'ETOM' ) {  // Email to Manager

        this.ETOM = true;

      }
      else if( true_que == 'CCT' ) { //Call Covid Team

        this.callCovidTeam();

      }
      else {
        this.selectedQuestions.push( true_que );
        this.conditions[true_que] = true;
      }
      
    }
    else if( event.target.value == 'no' ) {
      if( false_que == 'CRTW' ) { //Can't Return To Work

        this.alertCRTW();

      }
      else if( false_que == 'CCT' ) { //Call Covid Team

        this.callCovidTeam();

      }
      else if( false_que == '' ) {

      }
      else {

        this.selectedQuestions.push( false_que );
        this.conditions[false_que] = true;

      }
      
    }
    else {
      this.selectedQuestions.push( true_que );
      this.conditions[true_que] = true;
    }
  }

  save() {
    this.resetForm();
    this.dialog.open(SuccessComponent, { disableClose: true, data: {message: "Return to work requested !"}});
  }

  alertCRTW() {
    this.resetForm();
    this.dialog.open(ErrorComponent, { disableClose: true, data: {message: "Can't return to work !"}});
  }

  emailToManager() {
    
  }

  callCovidTeam() {
    this.resetForm();
    this.dialog.open(SuccessComponent, { disableClose: true, data: {message: "Call to Covid Teamq"}});
  }

  resetForm() {
    let keys = Object.keys(this.conditions);
    keys.shift();
    keys.forEach( key => {
      this.conditions[key] = false;
    } )
    this.selectedQuestions.length = 1;
  }



}
