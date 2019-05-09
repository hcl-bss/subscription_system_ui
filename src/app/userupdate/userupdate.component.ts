import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from "angular2-flash-messages";
import { GlobalServiceService } from "../global-service.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-userupdate',
  templateUrl: './userupdate.component.html',
  styleUrls: ['./userupdate.component.css']
})
export class UserupdateComponent implements OnInit {
  dropdownData: any;
  selectedrole;
  
  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private rowSelection;
  private rowData;

  // private gridApi;
  //private gridColumnApi;
  private columnDefsMultiple;
  private rowSelectionMultiple;
  private rowDataMultiple;
  constructor(
    private router: Router,
    private http: HttpClient,
    private flashMessage: FlashMessagesService,
    private globalServiceService: GlobalServiceService) { 
      this.columnDefs = [
        {
          headerName: "Main Menu",
          field: "menuName",
          width: 233
        }
      ];
      this.rowSelection = "single";
  
      this.columnDefsMultiple = [
        {
          headerName: "Sub Menu",
          field: "subMenuList",
          width: 233
        }
      ];
      this.rowSelectionMultiple = "multiple";
    }

  ngOnInit() {
       this.globalServiceService.getUserProfiles().subscribe(data => {
       this.dropdownData = data;
     });    
  }
  mainSubMenu(){
    this.globalServiceService.menuSubmenuList(this.selectedrole).subscribe(data => {
     // console.log(data);
    });    
  }
  onRowClicked(event: any) {
  }
  onRowClickedSubmenu(event: any) {
  }
  
  onSelectionChanged(event) {
    // console.log(event);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onGridReadyMultiple(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
