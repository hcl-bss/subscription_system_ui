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
       console.log(this.rowData.success+ "*******");
       console.log(this.rowData.failed+ "*******");
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





  