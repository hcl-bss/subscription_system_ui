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
  page = 0;
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
  duration = "Last Month";
  listOption = "ACTIVE VS CANCEL";
  graphperiod_data;
  graphtype_data;
  chartType;
  getrevenue_data;
  chartDatasets;
  chartLabels;
  chartColors;
  chartOptions;
  graphData;
  length: any;
  success_data;
  failed_data;
  total_data;
  //line chart graph-1 start
  graphData1() {
    this.globalServiceService.dashboardGraph(this.duration, this.listOption).subscribe(
      data => {
        this.graphData = data;
        this.chartType = 'line';
        if (this.listOption === "ACTIVE VS CANCEL") {
          this.chartDatasets = [
            { data: this.graphData.activSubValues, label: this.duration },
            { data: this.graphData.cancelSubValues, label: this.listOption }
          ];
        }
        else {
          this.chartDatasets = [
            { data: this.graphData.newSubValues, label: this.duration },
            { data: this.graphData.renewedSubValues, label: this.listOption }
          ];
        }
        this.chartLabels = this.graphData.timePeriod;
        this.chartColors = [];
        this.chartOptions = {
          responsive: true
        };
      });
  }
  //line chart graph-1 end
  constructor(private http: HttpClient, private globalServiceService: GlobalServiceService) {
  }
  ngOnInit() {
    // subreport
    this.page = 1;
    this.globalServiceService.subreport(this.page).subscribe(
      data => {
        this.rowData = data;
        this.success = this.rowData.success;
        this.failed = this.rowData.failed;
      });
    //graphperiod
    this.globalServiceService.graphperiod().subscribe(
      data => {
        this.graphperiod_data = data;
        this.graphperiod_data = this.graphperiod_data.dropDownList;
      });
    //graphtype
    this.globalServiceService.graphtype().subscribe(
      data => {
        this.graphtype_data = data;
        this.graphtype_data = this.graphtype_data.dropDownList;
      });
    //getRevenueData 
    this.globalServiceService.getRevenueData().subscribe(
      data => {
        this.getrevenue_data = data;
        this.getrevenue_data = this.getrevenue_data;
      });
    //getLastBatchRenewalCount 
    this.globalServiceService.getLastBatch().subscribe(
      data => {
        this.LastBatchRenewalCount = data;
        this.success_data = this.LastBatchRenewalCount.success;
        this.failed_data = this.LastBatchRenewalCount.failed;
        this.total_data = this.LastBatchRenewalCount.total;
      });
    //getRevenueData 
    this.globalServiceService.getRevenueData().subscribe(
      data => {
        this.getRevenueData = data;
        this.lastBatchRevOfNewSub = this.getRevenueData.lastBatchRevOfNewSub;
        this.lastBatchRevOfRenewSub = this.getRevenueData.lastBatchRevOfRenewSub;
        this.lastMonthRevOfNewSub = this.getRevenueData.lastMonthRevOfNewSub;
        this.lastMonthRevOfRenewSub = this.getRevenueData.lastMonthRevOfRenewSub;
        this.thisMonthRevOfNewSub = this.getRevenueData.thisMonthRevOfNewSub;
        this.thisMonthRevOfRenewSub = this.getRevenueData.thisMonthRevOfRenewSub;
        this.thisYearRevOfNewSub = this.getRevenueData.thisYearRevOfNewSub;
        this.thisYearRevOfRenewSub = this.getRevenueData.thisYearRevOfRenewSub;
      });
    //dashboardGraph
    this.globalServiceService.dashboardGraph(this.duration, this.listOption).subscribe(
      data => {
        this.graphData = data;
        this.chartType = 'line';
        this.chartDatasets = [
          { data: this.graphData.activSubValues, label: this.duration },
          { data: this.graphData.cancelSubValues, label: this.listOption }
        ];
        this.chartLabels = this.graphData.timePeriod;;
        this.chartColors = [];
        this.chartOptions = {
          responsive: true
        };
      });
  }
  executeScheduler(batchId) {
    this.globalServiceService.executeBatch(batchId).subscribe(
      data => {
        this.rowData = data;
      });
  }
}