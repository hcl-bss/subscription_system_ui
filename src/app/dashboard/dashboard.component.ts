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
  private LastBatch: any;
   private rowData: any;
  private getRevenueData: any; 
  lastBatchRevOfNewSub;
  LastBatchRenewalCount;
  lastBatchRevOfRenewSub;
  lastMonthRevOfNewSub;
lastMonthRevOfRenewSub;
thisMonthRevOfNewSub;
thisMonthRevOfRenewSub;
thisYearRevOfNewSub;
thisYearRevOfRenewSub;
  success;
  failed;
  date;
  total;
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
              //console.log(data); 
              this.graphData=data;              
               this.chartType= 'line';
               if(this.listOption === "ACTIVE VS CANCEL"){
                  this.chartDatasets = [
                    { data:  this.graphData.activSubValues, label: this.duration },
                    { data:  this.graphData.cancelSubValues, label: this.listOption }
                  ];
              }
              else{
                this.chartDatasets = [
                    { data:  this.graphData.newSubValues, label: this.duration },
                    { data:  this.graphData.renewedSubValues, label: this.listOption }
                  ];
              }
              // public chartLabels: Array<any> = [
              //   {
              //     text-transform: 'uppercase';
              //   }
              // ];

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
//     { data: [50,60,70,80,90,10,20,30,40,50,60,70,80,90,10,20,30,40,50,60,70,80,90,10,87,54,32,76,54,21,11], label: 'LAST MONTH' },
//      { data: [0,20,0,0,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,100,91,55,68,77,10,90,66,56,64], label: 'ACTIVE VS CANCEL' }
//   ];

//   public chartLabels2: Array<any> = [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,1,2,3,4];
  
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
        debugger;
        this.rowData = data; 
        this.success = this.rowData.success;
        this.failed = this.rowData.failed;
       
        debugger;
      });
      //graphperiod
      this.globalServiceService.graphperiod().subscribe(
        data => {
          this.graphperiod_data = data;
          this.graphperiod_data = this.graphperiod_data.dropDownList; 
          //console.log(this.graphperiod_data);
        });
      //graphtype
        this.globalServiceService.graphtype().subscribe(
          data => {
            this.graphtype_data = data;
            // sessionStorage.setItem('graphperiod_data',this.graphperiod_data.dropDownList);
            // this.graphperiod_dataa = sessionStorage.getItem('graphperiod_data');
            // this.graphperiod_dataaa = this.graphperiod_dataa;
            this.graphtype_data = this.graphtype_data.dropDownList; 
           // console.log(this.graphtype_data);
          });
      //getRevenueData 
        this.globalServiceService.getRevenueData().subscribe(
          data => {
            this.getrevenue_data = data;
            this.getrevenue_data = this.getrevenue_data; 
            // console.log(this.getrevenue_data);
            // console.log(this.getrevenue_data.lastBatchRevOfNewSub);
          });
      //getLastBatchRenewalCount 
        this.globalServiceService.getLastBatch().subscribe(
          data => {
            this.LastBatchRenewalCount = data; 
            this.success = this.LastBatchRenewalCount.success;
            this.failed = this.LastBatchRenewalCount.failed;
            this.total = this.LastBatchRenewalCount.total;
           
            // console.log( 'getLastBatchRenewalCount **********'+this.LastBatchRenewalCount.failed);
            //  console.log( 'getLastBatchRenewalCount **********'+this.LastBatchRenewalCount.success);
            //   console.log( 'getLastBatchRenewalCount **********'+this.LastBatchRenewalCount.total);
            //console.log(this.getrevenue_data.lastBatchRevOfNewSub);
          });
      //getRevenueData 
        this.globalServiceService.getRevenueData().subscribe(
          data => {
            debugger;
            this.getRevenueData = data; 
            debugger;
             this.lastBatchRevOfNewSub = this.getRevenueData.lastBatchRevOfNewSub;
            this.lastBatchRevOfRenewSub = this.getRevenueData.lastBatchRevOfRenewSub;

            this.lastMonthRevOfNewSub = this.getRevenueData.lastMonthRevOfNewSub;

             this.lastMonthRevOfRenewSub = this.getRevenueData.lastMonthRevOfRenewSub;

             this.thisMonthRevOfNewSub = this.getRevenueData.thisMonthRevOfNewSub;
             this.thisMonthRevOfRenewSub = this.getRevenueData.thisMonthRevOfRenewSub;
             this.thisYearRevOfNewSub = this.getRevenueData.thisYearRevOfNewSub;
             this.thisYearRevOfRenewSub = this.getRevenueData.thisYearRevOfRenewSub;
           
           
            //  console.log( 'getRevenueData **********'+this.lastBatchRevOfNewSub);
             
            //console.log(this.getrevenue_data.lastBatchRevOfNewSub);
          });


      //dashboardGraph
          this.globalServiceService.dashboardGraph(this.duration,this.listOption).subscribe(
            data => {
              // console.log(data); 
              this.graphData=data;

              
               this.chartType= 'line';
              // this.graphData.activSubValues = [50,60,70,80,90,10,20,30,40,50,60,70,80,90,10,20,30,40,50,60,70,80,90,10,87,54,32,76,54,21,11];
              // this.graphData.cancelSubValues = [0,20,0,0,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180,190,100,91,55,68,77,10,90,66,56,64];
              this.chartDatasets = [
                { data:  this.graphData.activSubValues, label: this.duration  },
                { data:  this.graphData.cancelSubValues, label: this.listOption }
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





  