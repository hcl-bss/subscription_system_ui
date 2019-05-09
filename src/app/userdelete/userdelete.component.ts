import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { GlobalServiceService } from "../global-service.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-userdelete',
  templateUrl: './userdelete.component.html',
  styleUrls: ['./userdelete.component.css']
})
export class UserdeleteComponent implements OnInit {
  dropdownData: any;
  result: any;
  selectedrole;
  resultData: any;

  constructor(private router: Router,
    private http: HttpClient,
    private flashMessage: FlashMessagesService,
    private globalServiceService: GlobalServiceService) { }

  ngOnInit() {

    this.globalServiceService.getUserProfiles().subscribe(data => {
      this.dropdownData = data;
    });
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
