import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../ngb-date-fr-parser-formatter";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-subscriptionreport',
  templateUrl: './subscriptionreport.component.html',
  styleUrls: ['./subscriptionreport.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})
export class SubscriptionreportComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData: any;
  batchRunLogDtoList: any;

  closeResult: string;
  producttype;
  name;
  description;
  sku;
  startDate;
  endDate;
  DrodownArray;
  code;
  P_code_Type;

  page = 0;
  filterPage = 0
  sDate;
  eDate;
  status_valMain;
  filterSearchFlag = false;
  totalpage;
  private components;

  constructor(private spinnerService: Ng4LoadingSpinnerService, private router: Router,
    private flashMessage: FlashMessagesService, private globalServiceService: GlobalServiceService) {

    this.columnDefs = [
      { headerName: "Date", field: "date" },
      {
        headerName: "Order Number", field: "orderNumber",
        // rowSpan: function(params) {
        //   var orderNumber = params.data.orderNumber;
        //   if (orderNumber === "3") {
        //     return 2;
        //   } else if (orderNumber === "2") {
        //     return 4;
        //   } else {
        //     return 1;
        //   }
        // },
        // cellClassRules: { "cell-span": "value==='1' || value==='2'" },
        //   width: 200

        rowSpan: function (params) {
          return params.data.orderNumber === '1' ? 1 : 1;

        },
        cellClassRules: { "cell-span": "value==='1'" },
        cellStyle: function (params) {
          if (params.data.orderNumber == 'O324') {
            // return {color: 'black', backgroundColor: '#17a2b8 !important'};
            return { color: 'black', backgroundColor: 'lightgreen !important' };
          } else if (params.data.orderNumber == 'O325') {
            // return {color: 'black', backgroundColor: '#ADD8E6 !important'};
            return { color: 'black', backgroundColor: 'lightsalmon !important' };
          }
          else if (params.data.orderNumber == 'O111') {
            //return {color: 'black', backgroundColor: '#17A2DF !important'};
            return { color: 'black', backgroundColor: 'lightcoral !important' };
          }
          else {
            return null;
          }
        }
      },
      {
        headerName: "Status", field: "status",
        cellStyle: function (params) {
          if (params.data.status == 'Fail') {
            return { color: 'red' };
          } else if (params.data.status == 'Success') {
            return { color: 'green' };
          }
          else {
            return null;
          }
        }
      },
      { headerName: "Error Desc", field: "errorDesc" },
      { headerName: "Subs Id", field: "subsId" }
    ];
    this.defaultColDef = {
      resizable: true
    };
  }

  ngOnInit() {
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.batchRunLogDtoList;
    this.globalServiceService.subreport(this.page).subscribe(
      data => {
        this.rowData = data;
        this.totalpage = this.rowData.totalPages;
        this.rowData = this.rowData.batchRunLogDtoList;

      });
  }

  previousFuntionality(startDateMain, endDateMain, status_valMainn) {
    this.page = this.page - 1;
    if (this.page == 0) {
      (document.getElementById("prev") as HTMLInputElement).disabled = true;
    }

    if (this.filterSearchFlag == true) {
      this.filterPage = this.filterPage - 1;
      if (this.filterPage == 0) {
        (document.getElementById("prev") as HTMLInputElement).disabled = true;
      }
      this.globalServiceService.reportSearch(this.sDate, this.eDate, this.filterPage, this.status_valMain).subscribe(
        data => {
          this.rowData = data;
          this.totalpage = this.rowData.totalPages;
          if (this.rowData.lastPage == true) {
            (document.getElementById("next") as HTMLInputElement).disabled = true;
          } else {
            (document.getElementById("next") as HTMLInputElement).disabled = false;
          }
          this.rowData = this.rowData.batchRunLogDtoList;
        });
    }
    else {
      this.globalServiceService.subreport(this.page).subscribe(
        data => {
          this.rowData = data;
          this.totalpage = this.rowData.totalPages;
          if (this.rowData.lastPage == true) {
            (document.getElementById("next") as HTMLInputElement).disabled = true;
          } else {
            (document.getElementById("next") as HTMLInputElement).disabled = false;
          }
        
          this.rowData = this.rowData.batchRunLogDtoList;
        });
    }
  }
  nextFuntionality(startDateMain, endDateMain, status_valMain) {
    (document.getElementById("prev") as HTMLInputElement).disabled = false;
    this.page = this.page + 1;
    if (this.filterSearchFlag == true) {
      this.filterPage = this.filterPage + 1;
      if (startDateMain != undefined) {
        this.sDate = startDateMain.day + '/' + startDateMain.month + '/' + startDateMain.year;
      }
      if (endDateMain != undefined) {
        this.eDate = endDateMain.day + '/' + endDateMain.month + '/' + endDateMain.year;
      }
      this.globalServiceService.reportSearch(this.sDate, this.eDate, this.filterPage, this.status_valMain).subscribe(
        data => {
          this.rowData = data;
          this.totalpage = this.rowData.totalPages;
          if (this.rowData.lastPage == true) {
            (document.getElementById("next") as HTMLInputElement).disabled = true;
          } else {
            (document.getElementById("next") as HTMLInputElement).disabled = false;
          }
          this.rowData = this.rowData.batchRunLogDtoList;
        });
    }
    else {
    
      this.globalServiceService.subreport(this.page).subscribe(
        data => {
          this.rowData = data;
          this.totalpage = this.rowData.totalPages;
          if (this.rowData.lastPage == true) {
            (document.getElementById("next") as HTMLInputElement).disabled = true;
          } else {
            (document.getElementById("next") as HTMLInputElement).disabled = false;
          }
         
          this.rowData = this.rowData.batchRunLogDtoList;
        });
    }

  }
  filterSearch(startDateMain, endDateMain, status_valMain) {
    this.filterPage=0; 
    let sDatevalidate;
    let eDatevalidate;
    (document.getElementById("prev") as HTMLInputElement).disabled = true;
    this.filterSearchFlag = true;
  
    if(sDatevalidate!=undefined){
      sDatevalidate = startDateMain.month + "/" + startDateMain.day + "/" + startDateMain.year;
      // mm/dd/yyyy
    }
    if(sDatevalidate!=undefined){
      eDatevalidate = endDateMain.month + "/" + endDateMain.day + "/" + endDateMain.year;
    }
    
    // let sDate = startDateMain.day + "/" + startDateMain.month + "/" + startDateMain.year;
    // let eDate = endDateMain.day + "/" + endDateMain.month + "/" + endDateMain.year;
    // dd/mm/yyyy
    let startDateValue = Date.parse(sDatevalidate);
    let endDateValue = Date.parse(eDatevalidate);
    if (startDateValue > endDateValue) {
      this.flashMessage.show(
        "Start date should be less than end date!!",
        {
          cssClass: "alert-danger",
          timeout: 10000
        }
      );
    }
    else {
      if (startDateMain != undefined) {
        this.sDate = startDateMain.day + '/' + startDateMain.month + '/' + startDateMain.year;
      }
      if (endDateMain != undefined) {
        this.eDate = endDateMain.day + '/' + endDateMain.month + '/' + endDateMain.year;
      }
      this.globalServiceService.reportSearch(this.sDate, this.eDate, this.filterPage, this.status_valMain).subscribe(
        data => {
          this.rowData = data;
          this.totalpage = this.rowData.totalPages;
          this.rowData = this.rowData.batchRunLogDtoList;
          if (this.rowData.lastPage == true) {
            (document.getElementById("next") as HTMLInputElement).disabled = true;
          } else {
            (document.getElementById("next") as HTMLInputElement).disabled = false;
          }
          this.rowData = data;
          this.rowData = this.rowData.batchRunLogDtoList;
        });
    }
  }

}
