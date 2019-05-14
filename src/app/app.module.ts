import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import {NgbModule,NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ContactListComponent } from './subscription/contact-list.component';
import { GlobalServiceService} from './global-service.service'
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { AgGridModule } from 'ag-grid-angular';
import { ModalsService } from './modal.service';
import{ModalPopUpComponent} from './modal.component'; 
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { PageService, SortService, FilterService, GroupService } from '@syncfusion/ej2-angular-grids';
import { TransactionsComponent } from './transactions/transactions.component';
import { ChildMessageRenderer } from "./child-message-renderer.component";
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ErrorDownloadComponent } from "./error-download.component";
import { FileDownloadComponent } from './file-download.component';
import { PlanComponent } from './plan/plan.component';
import { SidebarnavigationComponent } from './sidebarnavigation/sidebarnavigation.component';
import { AuthGuard } from './auth.guard';
import { ImportPlanComponent } from './import-plan/import-plan.component';
import { ProductComponent } from './products/product.component';
import { SubscriptionreportComponent } from './subscriptionreport/subscriptionreport.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgbDateFRParserFormatter } from "./ngb-date-fr-parser-formatter"; 
import { ChildMessageRendereredit } from './products/child-message-renderer_btn.component';
import { AssociatePlanComponent } from './associate-plan/associate-plan.component';
import { AssociateMappingComponent } from './associate-mapping.component';
import { ChartsModule } from 'ng2-charts';
import {GlobalPropertiesService} from './global-properties.service';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';
import { toggleFunctionality } from './products/toggleFunctionality';
import {EditPlanComponent} from './plan/edit_plan_data'
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UserdeleteComponent } from './userdelete/userdelete.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
//import {  NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { UsercreateComponent } from './usercreate/usercreate.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    ContactListComponent,
    ModalPopUpComponent,
    TransactionsComponent,
    ChildMessageRenderer,
    UsermanagementComponent,
    ErrorDownloadComponent,
    FileDownloadComponent,
    PlanComponent,
    SidebarnavigationComponent,
    ImportPlanComponent,
    ProductComponent,
    SubscriptionreportComponent,
    ChildMessageRendereredit,
    AssociatePlanComponent,
    AssociateMappingComponent,
    SubscriptionDetailComponent,
    toggleFunctionality,
    UserprofileComponent,
    UserdeleteComponent,
    EditPlanComponent,
    UserupdateComponent,
    UsercreateComponent,
    ViewProfileComponent

  ],

  imports: [
    BrowserModule,FormsModule,HttpClientModule,HttpModule,GridModule,ReactiveFormsModule,ChartsModule,
    AppRoutingModule,NgbModule.forRoot(),FlashMessagesModule.forRoot(),  
    AgGridModule.withComponents([ChildMessageRenderer,AssociateMappingComponent,EditPlanComponent]),NgbPaginationModule, NgbAlertModule,AgGridModule.withComponents([ErrorDownloadComponent])  ,
    AgGridModule.withComponents([FileDownloadComponent,ChildMessageRendereredit,toggleFunctionality]) ,
    [ Ng4LoadingSpinnerModule.forRoot() ] , MDBBootstrapModule.forRoot()
  ],
  
  providers: [ NgbDateFRParserFormatter,GlobalPropertiesService, GlobalServiceService, ModalsService, PageService, SortService, FilterService, GroupService,ChildMessageRenderer, AuthGuard,ChildMessageRendereredit,AssociateMappingComponent,toggleFunctionality,EditPlanComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
