import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NonAuthGuard } from './core/guards/non-auth.guard';
import { SsoAuthGuard } from './core/guards/sso-auth.guard';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { VerifyComponent } from './shared/verify/verify.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    // canActivate: [ NonAuthGuard ]
  },
  { 
    path: 'verify', 
    component: VerifyComponent,
    // canActivate: [ NonAuthGuard ] 
  },
  { 
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), 
    canActivate: [AuthGuard, SsoAuthGuard] 
  },
  { 
    path: '**', 
    pathMatch: 'full', 
    component: PageNotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
