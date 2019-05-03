import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import * as $ from 'jquery';
import { GlobalServiceService } from '../global-service.service';

@Component({
  selector: 'app-sidebarnavigation',
  templateUrl: './sidebarnavigation.component.html',
  styleUrls: ['./sidebarnavigation.component.css']
})
export class SidebarnavigationComponent implements OnInit {


  loginData;
  mappingData;
  constructor(private globalServiceService: GlobalServiceService) { 
     this.globalServiceService.sidebar();
     this.globalServiceService.sidebarsubmenu();
  }

  ngOnInit() {
   
    this.loginData=this.globalServiceService.loginResponse;
   
    this.mappingData=this.loginData.body.menuMap;
   
    
  }

}
