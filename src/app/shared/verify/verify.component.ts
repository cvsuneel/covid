import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { CommonService } from 'src/app/core/common/common.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  // showLoader: boolean = false;

  constructor( public authService: AuthService, private appService: AppService, public commonService: CommonService, private router: Router ) { }

  ngOnInit(): void {

    setTimeout( () => {

      if( this.appService.getSSOUserData() ) {

        sessionStorage.removeItem('access_token');
        this.login();
  
      }
      else {

        this.router.navigate( ['/'] );

      }
      
    }, 2000 );

  }

  login() {

    let username = 'manager';

    this.authService.perecta_login( username );
  
  }  

}
