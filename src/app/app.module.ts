import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './core/guards/auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { Section1Component } from './section1/section1.component';
import { Section2Component } from './section2/section2.component';
import { Section3Component } from './section3/section3.component';
import { Sub1Component } from './section1/sub1/sub1.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material.module";
import { AuthInterceptor } from './core/interceptors/auth-interceptor';
import { ErrorComponent } from './core/error/error.component';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';
import { VerifyComponent } from './shared/verify/verify.component';
import { HeaderComponent } from './core/common/header/header.component';
import { SidebarComponent } from './core/common/sidebar/sidebar.component';
import { FooterComponent } from './core/common/footer/footer.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { MyteamsCasesComponent } from './dashboard/myteams-cases/myteams-cases.component';
// import { MyCasesComponent } from './dashboard/my-cases/my-cases.component';
//import { AuthService } from './core/guards/auth.service';
import { HomeComponent } from './home/home.component';
import { PopoverComponentsModule } from './core/popover-components/popover-components.module';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Sub1Component,
    ErrorComponent,
    VerifyComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true
    }
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    PopoverComponentsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
