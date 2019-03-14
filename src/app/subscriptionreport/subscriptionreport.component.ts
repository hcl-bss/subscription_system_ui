import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import {NgbDatepickerConfig,NgbDateParserFormatter}from '@ng-bootstrap/ng-bootstrap';
import {NgbDateFRParserFormatter} from "../ngb-date-fr-parser-formatter";
import {Ng4LoadingSpinnerService} from 'ng4-loading-spinner';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-subscriptionreport',
  templateUrl: './subscriptionreport.component.html',
  styleUrls: ['./subscriptionreport.component.css'],
  providers: [{ provide: NgbDateParserFormatter,useClass: NgbDateFRParserFormatter}]
})
export class SubscriptionreportComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData;

  closeResult:string;
  producttype;
  name;
  description;
  sku;
  startDate;
  endDate;
  DrodownArray;
  code;
  P_code_Type;

page=0;
filterPage=0
sDate;
eDate;
filterSearchFlag=false;


  constructor(private spinnerService: Ng4LoadingSpinnerService, private router: Router,
    private flashMessage: FlashMessagesService,private globalServiceService: GlobalServiceService) { 
   
    this.columnDefs = [
      {
        field: "athlete",
        rowSpan: function(params) {
          var athlete = params.data.athlete;
          if (athlete === "Aleksey Nemov") {
            return 2;
          } else if (athlete === "Ryan Lochte") {
            return 4;
          } else {
            return 1;
          }
        },
        cellClassRules: { "cell-span": "value==='Aleksey Nemov' || value==='Ryan Lochte'" },
        width: 200
      },
      { field: "age",
      rowSpan: function(params) {
        if (params.data.age) {
          return 2;
        } else {
          return 1;
        }
      },
    },
      { field: "country",
      rowSpan: function(params) {
        return params.data.country==='United States' ? 2 : 1;
    }
    },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" }
    ];
    this.defaultColDef = {
      width: 100,
      resizable: true
    };
  }

  ngOnInit() {
  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.globalServiceService.subreport().subscribe(
      data => {
      this.rowData = data;
      });
    // this.http
    //   .get(
    //     "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json"
    //   )
    //   .subscribe(data => {
    //     this.rowData = data;
    //   });
  }



  filterSearch(startDateMain,endDateMain,status_valMain){
    this.filterSearchFlag=true;
  if(startDateMain!=undefined){
    this.sDate =startDateMain.day +'/' + startDateMain.month + '/' + startDateMain.year; 

  }
  if(endDateMain!=undefined){
    this.eDate =endDateMain.day +'/' + endDateMain.month +'/' + endDateMain.year;      
    
  }
  
  this.globalServiceService.reportSearch(this.sDate,this.eDate,this.filterPage,status_valMain).subscribe(
    data => {
      this.rowData = data;
           
      if(this.rowData.lastPage==true){
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        }else{
            (document.getElementById("next") as HTMLInputElement).disabled = false;
        }
        this.rowData=this.rowData.productList;
    });
}










}
