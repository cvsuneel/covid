import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { authConfig } from './sso.config';
import { AuthService } from './core/services/auth.service';
import { CommonService } from './core/common/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {

  title = 'oreilly-sso';
  public isAuth: any = false;
  msg: any;

  constructor(public authService: AuthService, public commonService: CommonService, private oauthService: OAuthService) {
    this.configureSingleSignOn()
  }

  configureSingleSignOn(){
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  
  ngOnInit() { }
  
}
