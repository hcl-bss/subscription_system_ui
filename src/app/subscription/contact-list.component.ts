import { Component, OnInit } from '@angular/core';
import { ModalsService } from '../modal.service';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient } from "@angular/common/http";
import { ChildMessageRenderer } from "../child-message-renderer.component";
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../ngb-date-fr-parser-formatter";
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [{provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter}]
})
export class ContactListComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationNumberFormatter;
  private rowData;
  private context;
  private frameworkComponents;
  private fileName;
  planName;
  filterSearchFlag: boolean = false;
  page = 0;
  filterPage = 0;
  totalPages;
  sDate;
  eDate;
  subscriptionId: string;
  customerName: string;
  status: string;
  fromDateStr: string;
  toDateStr: string;
  DrodownArraystatus: any;
  subscriptionNumber: any;
  emailDetail: any;
  cust_name: any;
  exportData;
  constructor(private spinnerService: Ng4LoadingSpinnerService, private router : Router,private flashMessage: FlashMessagesService,private http: HttpClient, private modalService: ModalsService, private globalServiceService: GlobalServiceService,private childMessageRenderer: ChildMessageRenderer) {

    this.columnDefs = [
      { headerName: 'SUBSCRIPTION NO', field: 'subscriptionId', unSortIcon: true },
      { headerName: 'CUSTOMBER NAME', field: 'customerName',unSortIcon: true },
      { headerName: 'EMAIL', field: 'email',unSortIcon: true },
      { headerName: 'PLAN NAME', field: 'planName',unSortIcon: true },
      { headerName: 'STATUS', field: 'status',unSortIcon: true },
      { headerName: 'PRICE', field: 'price',unSortIcon: true },
      { headerName: 'CREATED ON', field: 'createdDate',unSortIcon: true },
      { headerName: 'ACTIVATED ON', field: 'activatedDate',unSortIcon: true },
      { headerName: 'LAST BILLED ON', field: 'lastBillDate',unSortIcon: true },
      { headerName: 'NEXT BILL DATE', field: 'nextBillDate',unSortIcon: true, width:200},
    ];
   // this.rowData = this.createRowData();
    this.context = { componentParent: this };
    this.frameworkComponents = {
      childMessageRenderer: ChildMessageRenderer
    };
    this.rowSelection = "multiple";
    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }
  //open popup code start
  openModal(id: string) {
    this.modalService.open(id);
  }
  //open popup code end
 
  //close popup code start
  closeModal(id: string) {
    this.modalService.close(id);
  }
  //close popup code end

  ngOnInit() {
    this.globalServiceService.getStatusdropDown().subscribe(data => {
      this.DrodownArraystatus = data;
      this.DrodownArraystatus = this.DrodownArraystatus.dropDownList
      console.log(this.DrodownArraystatus);

    });
   }
  onPageSizeChanged(newPageSize) {
    var inputElement = <HTMLInputElement>document.getElementById("page-size");
    var value = inputElement.value;
    this.gridApi.paginationSetPageSize(Number(value));
  }


  searchSubcription(subscriptionId,customerName,planName,status,fromDateStr,toDateStr){
  
      (document.getElementById("prev") as HTMLInputElement).disabled = true;
    
    let sDate;
    let eDate;
    this.filterSearchFlag = true;
    // if(subscriptionNo==undefined&&customerName==undefined&&email==undefined&&planName==undefined&&status==undefined&&price==undefined&&createdDate==undefined&&activatedDate==undefined&&lastBillDate==undefined&&nextBillDate==undefined){
    //   this.flashMessage.show('Please enter filter criteria', { cssClass: 'alert-danger', timeout: 10000 });
    // }
    // else{
      let date=this.globalServiceService.dateValidation(fromDateStr,toDateStr);
      console.log("********",date);
      if(date==true){
        if(fromDateStr!=undefined){
           sDate = fromDateStr.day + "/" + fromDateStr.month + "/" + fromDateStr.year;
        }
      if(toDateStr!=undefined){
         eDate = toDateStr.day + "/" + toDateStr.month + "/" + toDateStr.year;
      }
       
  
      this.spinnerService.show();
      this.globalServiceService.searchSubcription(subscriptionId,customerName,planName,status,sDate,eDate,this.filterPage).subscribe(
        data => {
        this.spinnerService.hide();
        this.rowData=[];    
        this.rowData = data;
        this.totalPages=this.rowData.totalPages;
        if (this.rowData.lastPage == true) {
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        } else {
           (document.getElementById("next") as HTMLInputElement).disabled = false;
         }
        this.rowData=this.rowData.subscriptionList;
        
        for(let i=0;i<this.rowData.length;i++){
        //  console.log("********",this.rowData[i].ratePlanList);
         if(this.rowData[i].ratePlanList!=undefined){
          this.rowData[i].planName=(this.rowData[i].ratePlanList[0].planName);
          this.rowData[i].price=(this.rowData[i].ratePlanList[0].price);
         }
         else{
          this.rowData[i].planName="-";
          this.rowData[i].price="-";
         }         
       
      }
      //  this.flashMessage.show('Search successfully!!', { cssClass: 'alert-success', timeout: 10000 });
        
        },
      error=>{
        this.spinnerService.hide();
        this.rowData=[];  
        this.flashMessage.show(error.error.message, { cssClass: 'alert-danger', timeout: 10000 });
      });
      }else{
        this.flashMessage.show(
          "Start date should be less than end date!!",
          {
            cssClass: "alert-danger",
            timeout: 10000
          }
        );
      }

    // }
   
  }

  isValid(): boolean {
    if (this.router.url != '/subscriptions/report') {
              return true;
      }
    return false;
  }

  onGridReady(params) {
    let x=[]
    this.rowData = [];
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.globalServiceService.SubscriptionCalling(this.page).subscribe(
      data => {
        this.rowData = data;
        this.totalPages=this.rowData.totalPages;
        if (this.rowData.lastPage == true) {
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        } else {
           (document.getElementById("next") as HTMLInputElement).disabled = false;
         }
         this.rowData=this.rowData.subscriptionList;
        for(let i=0;i<this.rowData.length;i++){
        //  console.log("********",this.rowData[i].ratePlanList);
         if(this.rowData[i].ratePlanList!=undefined){
          this.rowData[i].planName=(this.rowData[i].ratePlanList[0].planName);
          this.rowData[i].price=(this.rowData[i].ratePlanList[0].price);
         }
         else{
          this.rowData[i].planName="-";
          this.rowData[i].price="-";
         }
      
       
      }
      // console.log(this.rowData);
       // params.api.paginationGoToPage(1);
      });
  }
  onQuickFilterChanged() {
    var inputElement= <HTMLInputElement>document.getElementById("quickFilter");
    this.gridApi.setQuickFilter(inputElement.value);
  }

  exportImport(){
    document.getElementById("exportImportBox").style.display="block";
  }
  // export to Csv code start
  onBtExport() {
    // var inputElements= <HTMLInputElement>document.getElementById("#fileName");
    var params = {
     fileName : "subscriptions",
      // fileName: inputElements.value
    };
    this.gridApi.exportDataAsCsv(params);
  }
// export to Csv code end



previousFuntionality(subscriptionId,customerName,planName,status,fromDateStr,toDateStr) {
  let sDate;
  let eDate;
  this.page = this.page - 1;
  if (this.page == 0) {
    (document.getElementById("prev") as HTMLInputElement).disabled = true;
  }

  if (this.filterSearchFlag == true) {
    this.filterPage = this.filterPage - 1;
    if (this.filterPage == 0) {
      (document.getElementById("prev") as HTMLInputElement).disabled = true;
    }
    if (fromDateStr != undefined) {
      sDate = fromDateStr.day + "/" + fromDateStr.month + "/" + fromDateStr.year;
    }
    if (toDateStr != undefined) {
      eDate = toDateStr.day + "/" + toDateStr.month + "/" + toDateStr.year;
    }

    

  this.spinnerService.show();
  this.globalServiceService.searchSubcription(subscriptionId,customerName,planName,status,sDate,eDate,this.filterPage).subscribe(
    data => {
    this.spinnerService.hide();
    this.rowData=[];    
    this.rowData = data;
    this.totalPages=this.rowData.totalPages;
    this.rowData=this.rowData.subscriptionList;
    
    for(let i=0;i<this.rowData.length;i++){  
     if(this.rowData[i].ratePlanList!=undefined){
      this.rowData[i].planName=(this.rowData[i].ratePlanList[0].planName);
      this.rowData[i].price=(this.rowData[i].ratePlanList[0].price);
     }
     else{
      this.rowData[i].planName="-";
      this.rowData[i].price="-";
     }         
     if (this.rowData.lastPage == true) {
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        } else {
           (document.getElementById("next") as HTMLInputElement).disabled = false;
         }
  }
  //  this.flashMessage.show('Search successfully!!', { cssClass: 'alert-success', timeout: 10000 });
    
    },
  error=>{
    this.spinnerService.hide();
    this.rowData=[];  
    this.flashMessage.show('No data found!!', { cssClass: 'alert-danger', timeout: 10000 });
  });
  } else {
   
    this.globalServiceService.SubscriptionCalling(this.page).subscribe(
      data => {
        this.rowData = data;
        this.totalPages=this.rowData.totalPages;
        if (this.rowData.lastPage == true) {
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        } else {
           (document.getElementById("next") as HTMLInputElement).disabled = false;
         }
        this.rowData=this.rowData.subscriptionList;
        
        for(let i=0;i<this.rowData.length;i++){
         if(this.rowData[i].ratePlanList!=undefined){
          this.rowData[i].planName=(this.rowData[i].ratePlanList[0].planName);
          this.rowData[i].price=(this.rowData[i].ratePlanList[0].price);
         }
         else{
          this.rowData[i].planName="-";
          this.rowData[i].price="-";
         }    
         }
    
      });
  }
}
nextFuntionality(subscriptionId,customerName,planName,status,fromDateStr,toDateStr) {
  let sDate;
  let eDate;
  (document.getElementById("prev") as HTMLInputElement).disabled = false;
  this.page = this.page + 1;

  if (this.filterSearchFlag == true) {
    this.filterPage = this.filterPage + 1;
    if (fromDateStr != undefined) {
      sDate = fromDateStr.day + "/" + fromDateStr.month + "/" + fromDateStr.year;
    }
    if (toDateStr != undefined) {
      eDate = toDateStr.day + "/" + toDateStr.month + "/" + toDateStr.year;
    }
    // let sDate = fromDateStr.day + "/" + fromDateStr.month + "/" + fromDateStr.year;
    // let eDate = toDateStr.day + "/" + toDateStr.month + "/" + toDateStr.year;

  this.spinnerService.show();
  this.globalServiceService.searchSubcription(subscriptionId,customerName,planName,status,sDate,eDate,this.filterPage).subscribe(
    data => {
    this.spinnerService.hide();
    this.rowData=[];    
    this.rowData = data;
    if (this.rowData.lastPage == true) {
      (document.getElementById("next") as HTMLInputElement).disabled = true;
    } else {
       (document.getElementById("next") as HTMLInputElement).disabled = false;
     }
    this.totalPages=this.rowData.totalPages;
    this.rowData=this.rowData.subscriptionList;
    
    for(let i=0;i<this.rowData.length;i++){  
     if(this.rowData[i].ratePlanList!=undefined){
      this.rowData[i].planName=(this.rowData[i].ratePlanList[0].planName);
      this.rowData[i].price=(this.rowData[i].ratePlanList[0].price);
     }
     else{
      this.rowData[i].planName="-";
      this.rowData[i].price="-";
     }         
  
  }
    },
  error=>{
    this.spinnerService.hide();
    this.rowData=[];  
    this.flashMessage.show('No data found!!', { cssClass: 'alert-danger', timeout: 10000 });
  });
  } else {
    this.globalServiceService.SubscriptionCalling(this.page).subscribe(
      data => {
        this.rowData = data;
        this.totalPages=this.rowData.totalPages;
        if (this.rowData.lastPage == true) {
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        } else {
           (document.getElementById("next") as HTMLInputElement).disabled = false;
         }
        this.rowData=this.rowData.subscriptionList;
        
        for(let i=0;i<this.rowData.length;i++){
         if(this.rowData[i].ratePlanList!=undefined){
          this.rowData[i].planName=(this.rowData[i].ratePlanList[0].planName);
          this.rowData[i].price=(this.rowData[i].ratePlanList[0].price);
         }
         else{
          this.rowData[i].planName="-";
          this.rowData[i].price="-";
         }    
         }
    
      });
  }
}
Reset(subscriptionId,customerName,planName,status,fromDateStr,toDateStr){
  this.subscriptionId="";
  this.customerName=""
  this.planName="";
  this.status="";
  this.fromDateStr="";
  this.toDateStr="";
}
onCellClicked1(event: any) {
   
  this.subscriptionNumber=event.data.subscriptionId;
  this.emailDetail=event.data.email;
  this.cust_name=event.data.customerName;  
  this.globalServiceService.subscriptionDetailsData(this.subscriptionNumber,this.emailDetail,this.cust_name);
  if (event.colDef.headerName == "SUBSCRIPTION NO") {   
    this.router.navigate(['/subscriptionDetail']);
  } 

}

exportToCsv(){
  this.globalServiceService.exportToCsvData('subscriptionlandingpage').subscribe(data => {
    this.exportData = data;
    let url =  this.exportData.url
    window.location.href = url;

  },
  error=>{
        let url = error.url
        window.location.href = url;
  }
  );
}

} 

