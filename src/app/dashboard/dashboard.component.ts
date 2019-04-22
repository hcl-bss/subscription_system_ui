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
  duration;
  listOption;
//line chart graph-1
public chartType: string = 'line';
  public chartDatasets: Array<any> = [
    { data: [50,
    60,
    70,
    80,
    90,
    70,
    60,
    100,
    95,
    80,
    95,
    95,
    95,
    95,
    95,
    95,
    95,
    100,
    105,
    90,
    70,
    50,
    40,
    45,
    35,
    25,
    15,
    10,
    5,
    2,
    1], label: 'My First dataset' },
    { data: [20,
    30,
    40,
    50,
    60,
    65,
    75,
    80,
    85,
    85,
    85,
    85,
    85,
    85,
    85,
    85,
    90,
    95,
    95,
    95,
    95,
    95,
    95,
    95,
    95,
    100,
    100,
    100,
    100,
    105,
    106], label: 'My Second dataset' }
  ];
  public chartLabels: Array<any> = ["1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31"];
  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, 0)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, 0)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
//line chart graph-1 end

graphData1(){ 
this.chartDatasets=[];
this.chartType = 'line';
if(this.duration!=undefined && this.listOption!=undefined){
 this.chartDatasets.push(
     { data: [65, 59, 80, 81, 56, 55], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27], label: 'My Second dataset' }
   
  )
  
}else 
if(this.duration==undefined && this.listOption!=undefined){
 this.chartDatasets.push(
    { data: [65, 59], label: 'My First dataset' },
    { data: [28, 48], label: 'My Second dataset' }
  )
}else 
if(this.listOption==undefined && this.duration!=undefined){
   this.chartDatasets.push(
   { data: [65, 59, 80, 81], label: 'My First dataset' },
    { data: [28, 48, 40, 19], label: 'My Second dataset' }
  )
}

}
//line chart graph-2


public chartType2: string = 'line';

  public chartDatasets2: Array<any> = [
    { data: [1000,65, 59, 80, 81, 56, 55, 30,70,30, 10,60], label: 'My First dataset' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels2: Array<any> = ['January', 'February', '', 'April', 'May', 'June', 'July', 'August','September','October','November', 'December' ];
  //public chartLabels2: Array<any> = ['1', ];
  public chartColors2: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .0)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .0)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions2: any = {
    responsive: true
  };
  public chartClicked2(e: any): void { }
  public chartHovered2(e: any): void { }

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


 
  //close popup code end

  ngOnInit() { 
    this.page =1;
   
    
    this.globalServiceService.subreport(this.page).subscribe(
      data => {
        this.rowData = data; 
       // data = this.rowData.success;
      // console.log(this.rowData.success+ "*******");
      // console.log(this.rowData.failed+ "*******");
        this.success = this.rowData.success;
        this.failed = this.rowData.failed;
        this.date = this.rowData.date;
       // this.pieChartData= [this.failed, this.sucess];
        //console.log(this.pieChartData);
      });
     }
  executeScheduler(batchId){
        this.globalServiceService.executeBatch(batchId).subscribe(
          data => {
            this.rowData = data; 
          });
      }
  }





  