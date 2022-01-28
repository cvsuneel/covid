import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getFormUrlEncoded } from '../pipes/FormEncoder';
import { commonInterfaces } from "../interfaces/commonInterfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  backendURL: any;
  userToken: any;  
  
  constructor( 
    private httpClient: HttpClient
  ) { 

    this.backendURL = environment.BACKEND_URL;

  };

  login(username: any) {

    let postData = {
      'grant_type': 'password',
      'client_id': 'toto',
      'client_secret': 'sec',
      'username': username,
      'password': "Test@123",
      'navigatorInformation[browserName]': "Chrome",
      'navigatorInformation[platformName]': "Windows",
      'navigatorInformation[browserVersion]': 85,
      'platform': 'oreilly'
    };

    return this.httpClient.post(`${this.backendURL}/oauth/token`, getFormUrlEncoded(postData), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
  };

  closeAllSession(username: any) {

    return this.httpClient.get(`${this.backendURL}/users/${username}/isConCurrentUserActive/false/username/${username}`);

  };
  
  signOut( userId: any ) {
    
    return this.httpClient.get( `${ this.backendURL }/users/${ userId }/adminId/false/isConCurrentUserActive/false` )
    
  }

  getHeaders() {

    this.userToken = localStorage.getItem( "UserToken" ) ? localStorage.getItem( "UserToken" ) : false;

    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'x-authorization': this.userToken
    } );

    return headers;

  };

  add_new_case( postData: any ) {

    return this.httpClient.post(`${ this.backendURL }/entries/61d6f3dc33864300114bbdb4`, postData, { headers: this.getHeaders() })

  };

  contact_tracing( apiData: commonInterfaces[ "iApiDataObj" ] ): any {

    switch ( apiData.method ) {

      case "GET":

        return; // not required as of now.
      case "POST":

        return this.httpClient.post( apiData.url, apiData.postData, { headers: this.getHeaders() } );
      default:

        return; //do nothing.
    }
  };

  getCaseDetails( schemaId: any, documentId: any ) {

    let schemaDetails = this.httpClient.get( `${ this.backendURL }/schema/${ schemaId }`, { headers: this.getHeaders() } )

    let caseDetails = this.httpClient.get( `${ this.backendURL }/entries/${ schemaId }/${ documentId }`, { headers: this.getHeaders() } )


    return forkJoin([ schemaDetails, caseDetails ]);

  }

  getAppData( apiData: commonInterfaces[ "iApiDataObj" ] ) {

    return this.httpClient.post( `${ this.backendURL + apiData.url }`, apiData.postData, { headers: this.getHeaders() } );

  }

  getCaseHistory( schemaId: any, documentId: any ) {

    return this.httpClient.get( `${ this.backendURL }/entries/${ schemaId }/${ documentId }/logs?page=1&pagesize=100&select=title,old,new,modifiedBy,ip,modifiedDate&sort=-modifiedDate`, 
      { headers: this.getHeaders() } );

    // let url = 'http://localhost:3000/entries/61d6f3dc33864300114bbdb4/61f294bc05fad717ece968fd/logs?page=1&pagesize=10&select=title,old,new,modifiedBy,ip,modifiedDate&sort=-modifiedDate';
  }

}
