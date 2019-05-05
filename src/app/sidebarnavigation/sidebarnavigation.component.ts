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

  roleName;
  loginData;
  mappingData;
  userName;
  a;
  b=[];
  constructor(private globalServiceService: GlobalServiceService) { 
     this.globalServiceService.sidebar();
     this.globalServiceService.sidebarsubmenu();
  }

  ngOnInit() {
   
    this.loginData=this.globalServiceService.loginResponse;
   
    this.mappingData=this.loginData.body.menuMap;
    this.userName = this.loginData.body.userFirstName;
    debugger;
    this.roleName = this.loginData.body.roleNameSet[0];

    this.a= Object.keys(this.mappingData);
    for(let prop of this.a){
      this.b.push(this.a[prop]);
      console.log("bbbbbbbbbbbb",this.b);
    }
    
    console.log("*****",this.a);
    
    console.log('navigation---------------- '+ this.mappingData);
   
    
  }

}
