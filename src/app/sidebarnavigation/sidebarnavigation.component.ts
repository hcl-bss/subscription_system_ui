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
  username;
  userNameLogin;
  roleNameLogin;
  constructor(private globalServiceService: GlobalServiceService) { 
     this.globalServiceService.sidebar();
     this.globalServiceService.sidebarsubmenu();
     
  }
//  logOut(){
//             this.globalServiceService.logout()     
//       }


  logOut(){
    this.globalServiceService.logout().subscribe(data=>{
      let res:any=data;
      if(res==true){
        sessionStorage.removeItem('X-Auth-Token'); 
      }else{

      }
    });
  }

 


keys() : Array<string>
{
  return Object.keys(this.mappingData);
}
  ngOnInit() {
   
    this.loginData=this.globalServiceService.currentUserData;
    
    this.username = this.globalServiceService.currentUserData.body.userName;
    this.username;
    //  this.userNameLogin= this.loginData.body.userName;
   
    this.mappingData=this.loginData.body.menuMap;
   // console.log("cool : ",this.mappingData);
    // this.userName = this.loginData.body.userFirstName;

    // this.roleName = this.loginData.body.roleNameSet[0];
    }
    
  }

