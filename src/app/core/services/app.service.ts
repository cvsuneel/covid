import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  getUserDataFromLocalStorage() {

    let userDataString = localStorage.getItem( 'UserData' ) ?  localStorage.getItem( 'UserData' ) : false;
    let userData;

    try {
      
      userData = userDataString ? JSON.parse( userDataString ) : false;

    } catch( err ) {
      
      userData = false;

    }
    return userData;

  }

  getUserToken() {

    let userToken = localStorage.getItem( 'UserToken' ) ? localStorage.getItem( 'UserToken' ) : false;

    return userToken;

  }

  getUserRole() {

    let userData = this.getUserDataFromLocalStorage();

    let userRole = userData.roles[0];

    return userRole['title'];
    
  }

  getUserTmNo() {
    
    let userData = this.getUserDataFromLocalStorage();

    let oreillyData = userData['oreilly_data'];
    
    return oreillyData['user_tm_no'];

  }

  //User's Supervisor Number
  getUserSupervisorNo() {

    let userData = this.getUserDataFromLocalStorage();

    let oreillyData = userData['oreilly_data'];
    
    return oreillyData['supervisor_tm_no'];

  }

  getSSOUserData() {

    let ssoUserData = sessionStorage.getItem( 'id_token_claims_obj' ) ? sessionStorage.getItem( 'id_token_claims_obj' ) : false;

    return ssoUserData;

  }

}
