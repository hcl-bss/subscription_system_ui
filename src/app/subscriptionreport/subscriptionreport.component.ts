import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
@Component({
  selector: 'app-subscriptionreport',
  templateUrl: './subscriptionreport.component.html',
  styleUrls: ['./subscriptionreport.component.css']
})
export class SubscriptionreportComponent implements OnInit {

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private defaultColDef;
  private rowData;

  constructor(private router : Router,private globalServiceService: GlobalServiceService,private http: HttpClient) { 
   
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

}
