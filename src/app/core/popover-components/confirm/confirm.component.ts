import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  response: any;

  constructor( public dialogRef: MatDialogRef<ConfirmComponent>, 
                @Optional() @Inject(MAT_DIALOG_DATA) public data: { message: string, info: string }
            ) {}

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close( { cancel: true } )
  }

  confirm() {
    this.dialogRef.close( { confirm: true, response: this.response } )
  }

}
