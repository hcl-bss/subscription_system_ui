import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from "../global-service.service";

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  title = 'app';
  rowData; 
  columnDefs;
  pageNo=0;
  totalPages: any;
  constructor(private globalServiceService: GlobalServiceService) {
    this.columnDefs = [
      { headerName: 'Profile', field: 'roleName',width:200 },
      { headerName: 'Description', field: 'description',width:873 }
    ];
   

  }

  ngOnInit() {
    //get all roles and description
    this.globalServiceService.viewProfileList(this.pageNo).subscribe(data => {
      console.log(data);
      this.rowData = data;
      this.totalPages = this.rowData.totalPages;
      if (this.rowData.lastPage == true) {
        (document.getElementById("next") as HTMLInputElement).disabled = true;
      } else {
        (document.getElementById("next") as HTMLInputElement).disabled = false;
      }
      this.rowData = this.rowData.roleDtoList;
     
    },
      error => {
        console.log(error);
      });
  }
  callingDeleteProfile(){

  }
  nextFuntionality(){
    (document.getElementById("prev") as HTMLInputElement).disabled = false;
    this.pageNo = this.pageNo + 1;
    this.globalServiceService.viewProfileList(this.pageNo).subscribe(data => {
      console.log(data);
      this.rowData = data;
      this.totalPages = this.rowData.totalPages;
      if (this.rowData.lastPage == true) {
        (document.getElementById("next") as HTMLInputElement).disabled = true;
      } else {
        (document.getElementById("next") as HTMLInputElement).disabled = false;
      }

      this.rowData = this.rowData.roleDtoList;    

      },
      error => {
        console.log(error);
      });
  }
  previousFuntionality(){
  this.pageNo = this.pageNo - 1;

    if (this.pageNo == 0) {
      (document.getElementById("prev") as HTMLInputElement).disabled = true;
    }
    this.globalServiceService.viewProfileList(this.pageNo).subscribe(data => {
      console.log(data);
      this.rowData = data;
     
      this.totalPages = this.rowData.totalPages;
      if (this.rowData.lastPage == true) {
        (document.getElementById("next") as HTMLInputElement).disabled = true;
      } else {
        (document.getElementById("next") as HTMLInputElement).disabled = false;
      }
      this.rowData = this.rowData.roleDtoList;
    },
      error => {
        console.log(error);
      });
  }
  
}
