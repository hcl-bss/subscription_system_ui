import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ContactListComponent} from './subscription/contact-list.component';
import {UsermanagementComponent} from './usermanagement/usermanagement.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {PlanComponent} from './plan/plan.component';
import { AuthGuard } from './auth.guard';
import { ImportPlanComponent } from './import-plan/import-plan.component';
import { ProductComponent } from './products/product.component';
import { SubscriptionreportComponent } from './subscriptionreport/subscriptionreport.component';
import { AssociatePlanComponent } from './associate-plan/associate-plan.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {UserdeleteComponent} from './userdelete/userdelete.component';
import {UserupdateComponent} from './userupdate/userupdate.component';
import {ViewProfileComponent} from './view-profile/view-profile.component'
import { UsercreateComponent } from './usercreate/usercreate.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'header', component: HeaderComponent, canActivate :[AuthGuard] },
  { path: 'associateplan', component: AssociatePlanComponent , canActivate :[AuthGuard] },
  { path: 'product', component: ProductComponent,
  children: [
    {
      path: 'import',
      component: ImportPlanComponent
    }
   ],
  
  canActivate :[AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate :[AuthGuard] },
  { path: 'associateplan',component: AssociatePlanComponent, canActivate :[AuthGuard] },  
  { path: 'subscriptions', component: ContactListComponent,
  children: [
    {
      path: 'report',
      component: SubscriptionreportComponent
    }],
  canActivate :[AuthGuard] },
  { path: 'usermanagement', component: UsermanagementComponent, canActivate :[AuthGuard] },
  { path: 'subscriptionDetail', component: SubscriptionDetailComponent, canActivate :[AuthGuard] },  
  { path: 'transactions', component: TransactionsComponent, canActivate :[AuthGuard] },
  { path: 'plan', component: PlanComponent, canActivate :[AuthGuard] },
  { path: 'userprofile', component: UserprofileComponent, canActivate :[AuthGuard] },
  // { path: 'viewProfile/userdelete', component: UserdeleteComponent, canActivate :[AuthGuard] },
  { path: 'viewProfile/userupdate', component: UserupdateComponent, canActivate :[AuthGuard] },
    { path: 'viewProfile/usercreate', component: UsercreateComponent, canActivate :[AuthGuard] },
  { path: 'viewProfile', component: ViewProfileComponent, canActivate :[AuthGuard] },
  { path: '**', redirectTo: '' },
  { path: '', redirectTo: ' ', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
