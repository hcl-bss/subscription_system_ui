import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalsService } from '../modal.service';
import { GlobalServiceService } from '../global-service.service';

import { HttpClient } from "@angular/common/http";
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page =0;
  private rowData: any;
  success;
  failed;
  date;
  duration="Last Month";
  listOption="ACTIVE VS CANCEL";
  graphperiod_data;
  graphtype_data;
  chartType;
  getrevenue_data;
  chartDatasets;
   chartLabels;
    chartColors;
     chartOptions;
     graphData;
     length:any;
//line chart graph-1
// public chartType: string = 'line';
//   public chartDatasets: Array<any> = [
//     { data: [], label: 'My First dataset' },
//     { data: [], label: 'My Second dataset' }
//   ];
//   public chartLabels: Array<any> = [];
//   public chartColors: Array<any> = [
//     // {
//     //   backgroundColor: 'rgba(105, 0, 132, 0)',
//     //   borderColor: 'rgba(200, 99, 132, .7)',
//     //   borderWidth: 2,
//     // },
//     // {
//     //   backgroundColor: 'rgba(0, 137, 132, 0)',
//     //   borderColor: 'rgba(0, 10, 130, .7)',
//     //   borderWidth: 2,
//     // }
//   ];
//   public chartOptions: any = {
//     responsive: true
//   };
//   public chartClicked(e: any): void { }
//   public chartHovered(e: any): void { }
//line chart graph-1 end

graphData1(){ 
      this.globalServiceService.dashboardGraph(this.duration,this.listOption).subscribe(
            data => {
              console.log(data); 
              this.graphData=data;              
               this.chartType= 'line';
               if(this.listOption === "ACTIVE VS CANCEL"){
                  this.chartDatasets = [
                    { data:  this.graphData.activSubValues, label: 'My First dataset' },
                    { data:  this.graphData.cancelSubValues, label: 'ACTIVE VS CANCEL' }
                  ];
              }
              else{
                this.chartDatasets = [
                    { data:  this.graphData.newSubValues, label: 'My First dataset' },
                    { data:  this.graphData.renewedSubValues, label: 'My Second dataset' }
                  ];
              }
              this.chartLabels = this.graphData.timePeriod;
              this.chartColors = [];
              this.chartOptions= {
                responsive: true
              };
            });
}

//line chart graph-2


// public chartType2: string = 'line';

//   public chartDatasets2: Array<any> = [
//     { data: [], label: 'My First dataset' },
//     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
//   ];

//   public chartLabels2: Array<any> = [];
  
//   public chartColors2: Array<any> = [
 
//   ];

//   public chartOptions2: any = {
//     responsive: true
//   };
//   public chartClicked2(e: any): void { }
//   public chartHovered2(e: any): void { }

//line chart graph-2 end


//   public pieChartOptions: ChartOptions = {
//     responsive: true,
//   };
//   public pieChartLabels: Label[] = [['Failed Result'], ['Sucess Result']];
//   public pieChartData: SingleDataSet = [this.failed, this.sucess];
//   public pieChartType: ChartType = 'pie';
//   public pieChartLegend = true;
//   public pieChartPlugins = [];
//   public chartColors: Array<any> = [
//     { 
//       backgroundColor: ['#f7464a', '#97bbcd']
//     }
// ]



  
  constructor(private http: HttpClient, private globalServiceService: GlobalServiceService) { 
   
  }
  ngOnInit() {     
    // subreport
    this.page =1;
    this.globalServiceService.subreport(this.page).subscribe(
      data => {
        this.rowData = data; 
        this.success = this.rowData.success;
        this.failed = this.rowData.failed;
        this.date = this.rowData.date;
      });
      //graphperiod
      this.globalServiceService.graphperiod().subscribe(
        data => {
          this.graphperiod_data = data;
          this.graphperiod_data = this.graphperiod_data.dropDownList; 
          console.log(this.graphperiod_data);
        });
      //graphtype
        this.globalServiceService.graphtype().subscribe(
          data => {
            this.graphtype_data = data;
            this.graphtype_data = this.graphtype_data.dropDownList; 
            console.log(this.graphtype_data);
          });
      //getRevenueData 
        this.globalServiceService.getRevenueData().subscribe(
          data => {
            this.getrevenue_data = data;
            this.getrevenue_data = this.getrevenue_data; 
            console.log(this.getrevenue_data);
            console.log(this.getrevenue_data.lastBatchRevOfNewSub);
          });
      //dashboardGraph
          this.globalServiceService.dashboardGraph(this.duration,this.listOption).subscribe(
            data => {
              console.log(data); 
              this.graphData=data;

              
               this.chartType= 'line';
              this.chartDatasets = [
                { data:  this.graphData.activSubValues, label: 'My First dataset' },
                { data:  this.graphData.cancelSubValues, label: 'My Second dataset' }
              ];
              this.chartLabels = this.graphData.timePeriod;;
              this.chartColors = [];
              this.chartOptions= {
                responsive: true
              };
            });
            // this.chartClicked2(e);
            // this.chartHovered2(e);
     }

  // public chartClicked2(e: any): void { }
  // public chartHovered2(e: any): void { }


  executeScheduler(batchId){
        this.globalServiceService.executeBatch(batchId).subscribe(
          data => {
            this.rowData = data; 
          });
      }
  }





  