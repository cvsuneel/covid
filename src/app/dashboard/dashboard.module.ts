import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MyteamsCasesComponent } from './myteams-cases/myteams-cases.component';
import { MyCasesComponent } from './my-cases/my-cases.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AddNewCaseComponent } from './add-new-case/add-new-case.component';
import { FormIComponent } from './add-new-case/form-i/form-i.component';
import { FormIIComponent } from './add-new-case/form-ii/form-ii.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ReturnToWorkComponent } from './return-to-work/return-to-work.component';
import { ContactTracingComponent } from './contact-tracing/contact-tracing.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { CaseHistoryComponent } from './case-history/case-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfeqtaDataExtracterPipe } from '../core/pipes/perfeqta-data-extracter.pipe';
import { DataExtracterPipe } from '../core/pipes/dataExtractor';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    MyteamsCasesComponent,
    MyCasesComponent,
    AddNewCaseComponent,
    FormIComponent,
    FormIIComponent,
    ReturnToWorkComponent,
    ContactTracingComponent,
    CaseDetailsComponent,
    CaseHistoryComponent,
    PerfeqtaDataExtracterPipe,
    DataExtracterPipe
  ],
  imports: [
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  exports: [NgxPaginationModule]
})
export class DashboardModule { }
