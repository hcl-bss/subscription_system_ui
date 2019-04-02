import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalsService } from '../modal.service';
import { GlobalServiceService } from '../global-service.service';

import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  page =0;
  private rowData: any;
  constructor(private http: HttpClient, private globalServiceService: GlobalServiceService) { 
    
  }


 
  //close popup code end

  ngOnInit() { 
    this.page =1;
    this.globalServiceService.subreport(this.page).subscribe(
      data => {
        this.rowData = data;
        
        data = this.rowData.success;
       
       console.log(this.rowData.success+ "*******");
       console.log(this.rowData.failed+ "*******");
        this.rowData = this.rowData.batchRunLogDtoList;
      });
  }
  

 
}

