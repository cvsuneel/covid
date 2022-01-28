import { Injectable } from '@angular/core';
import { caseInterfaces } from '../interfaces/caseInterefaces';
// import { MatSidenav } from '@angular/material/sidenav';
// import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public isShowing: any = true;
  public showLoader: boolean = false;
  public selectedCase: caseInterfaces[ "iCaseData" ];
  public contactTracings: [];
  
  constructor() { }

  toggleSideNav() {
    this.isShowing = !this.isShowing;
  }

}
