import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  constructor( @Inject(MAT_DIALOG_DATA) public data: { message: string }, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
  }

  close() {

    this.dialog.closeAll();

  }

  nav() {
    this.dialog.closeAll();
    this.router.navigate(["/dashboard"]);
  }

}
