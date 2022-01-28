import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { getFormUrlEncoded } from 'src/app/core/pipes/FormEncoder';
import { urlBase64Decode } from 'src/app/core/pipes/urlBase64';
import { BehaviorSubject } from 'rxjs';
import * as LZString from 'lz-string';
import { ApiService } from './api.service';
import { AppService } from './app.service';
import { CommonService } from '../common/common.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated: boolean = false;
  public token: any;
  public err = new BehaviorSubject<any>(null);
  public showLoader: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private appService: AppService,
    private commonService: CommonService,
    private oauthService: OAuthService
  ) { }
  
  getToken() {
    return this.token = localStorage.getItem('UserToken');
  }
  
  get getIsAuth() {
    this.isAuthenticated = localStorage.getItem('isAuthenticated') ? Boolean( localStorage.getItem('isAuthenticated') ) : false;
    return this.isAuthenticated ? true : false;
  }

  get getIsSSOAuth() { 
    this.isAuthenticated = this.appService.getSSOUserData() ? true : false;
    return this.isAuthenticated ? true : false;
  }

  signOut() { 

    let userData = this.appService.getUserDataFromLocalStorage();
    let userId = userData ? userData._id : false;

    if( !userId ) {

      localStorage.clear();
      this.isAuthenticated = false;
      this.ssoSignOut();
      return;

    }
    else {

      this.apiService.signOut( userId )
      .subscribe( ( data: any ) => {

        localStorage.clear();
        this.isAuthenticated = false;
        this.ssoSignOut();
        return;

      } ) 

    }

  }

  perecta_login( username: any ) { 
    
    this.commonService.showLoader = true;
    this.apiService.login( username )
    .subscribe((data: any) => {
      if (data && data.access_token) {

        let decompressToken = LZString.decompressFromEncodedURIComponent(data.access_token);
        if (decompressToken) {

          this.saveloginInfo( decompressToken );
          
        }
        else {

          this.closeAllSession( username );

        }
      }
      return true;
    }),
    (err: any) => {
      this.commonService.showLoader = false;
      this.err.next(err)
    }
  }
  
  saveloginInfo( decompressToken: any ) {
    let decodedToken = JSON.parse(urlBase64Decode(decompressToken.split('.')[1]));
          
    localStorage.setItem('UserData', JSON.stringify(decodedToken));
    localStorage.setItem('UserToken', decodedToken.adToken);
    localStorage.setItem('isAuthenticated', "true");

    this.token = decodedToken.adToken ? decodedToken.adToken : "";
    this.isAuthenticated = decodedToken.adToken ? true : false;
    this.commonService.showLoader = false;

    this.router.navigate(['/dashboard']);
  }

  closeAllSession( username: any ) {
    // http://localhost:3000/users/perfeqta_sbiswal/isConCurrentUserActive/false/username/perfeqta_sbiswal
    
    this.apiService.closeAllSession( username )
    .subscribe( ( data: any ) => {

      if( data && data.isConCurrentUserActive === 'false' && data.username === username ) {

        this.perecta_login( data.username );

      }
      else {

        this.signOut();

      }

    } ),
    ( err: any ) => {
      this.commonService.showLoader = false;
      this.err.next(err)
    }

  }

  ssoSignIn(){
    this.oauthService.initImplicitFlow();
  }
  
  ssoSignOut(){
    this.oauthService.logOut();
    this.router.navigate(['/']);
  }

}
