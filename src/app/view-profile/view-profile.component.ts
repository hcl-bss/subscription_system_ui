import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { GlobalServiceService } from "../global-service.service";
import { NgbModal, ModalDismissReasons,NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";

import { FlashMessagesService } from "angular2-flash-messages";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  title = 'app';
  rowData; 
  columnDefs;
  pageNo=0;
  totalPages: any;
  closeResult: string;

  //for delete profile
  dropdownData: any;
  result: any;
  selectedrole;
  resultData: any;

  constructor(private globalServiceService: GlobalServiceService,private modalService: NgbModal,  config: NgbModalConfig,
    private router: Router,
    private http: HttpClient,
    private flashMessage: FlashMessagesService) {
    this.columnDefs = [
      { headerName: 'Profile', field: 'roleName',width:200 },
      { headerName: 'Description', field: 'description',width:873 }
    ];
   

  }
  openSm(deleteprofile) {
    this.modalService.open(deleteprofile, { size: 'sm' });
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
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

      //for delete profile
      this.globalServiceService.getUserProfiles().subscribe(data => {
        this.dropdownData = data;
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
  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with:
${reason}`;
    }
  }

  deleteProfile(){
    this.globalServiceService.deleteSelectedProfile(this.selectedrole).subscribe(
      result=>{
        let msg;
          this.resultData= result;
          msg=this.resultData.message;
          this.flashMessage.show(msg, {
            cssClass: "alert-success",
            timeout: 5000
          });
          this.globalServiceService.getUserProfiles().subscribe(data => {
            this.dropdownData = data;
          });
          //this.selectedrole="Select";
      },
      error=>{
        let msg;
         msg=error;
        console.log(error);
        this.flashMessage.show(msg.error.error, {
                      cssClass: "alert-danger",
                      timeout: 5000
                    });
       
        
      }
    )
  }
}
