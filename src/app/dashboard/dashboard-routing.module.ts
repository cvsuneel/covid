import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewCaseComponent } from './add-new-case/add-new-case.component';
import { CaseDetailsComponent } from './case-details/case-details.component';
import { CaseHistoryComponent } from './case-history/case-history.component';
import { ContactTracingComponent } from './contact-tracing/contact-tracing.component';
import { DashboardComponent } from './dashboard.component';
import { MyCasesComponent } from './my-cases/my-cases.component';
import { MyteamsCasesComponent } from './myteams-cases/myteams-cases.component';
import { ReturnToWorkComponent } from './return-to-work/return-to-work.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path:'add-new-case', 
    component: AddNewCaseComponent
  },
  {
    path:'case-details/:encodedId', 
    component: CaseDetailsComponent
  },
  {
    path:'case-history/:encodedId', 
    component: CaseHistoryComponent
  },
  {
    path:'return-to-work/:encodedId', 
    component: ReturnToWorkComponent
  },
  {
    path:'contact-tracing/:encodedId', 
    component: ContactTracingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
