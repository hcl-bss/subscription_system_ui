import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ModalsService } from '../modal.service';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient } from "@angular/common/http";
import { ChildMessageRenderer } from "../child-message-renderer.component";
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AssociateMappingComponent } from '../associate-mapping.component';
import { Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-associate-plan',
  templateUrl: './associate-plan.component.html',
  styleUrls: ['./associate-plan.component.css']
})
export class AssociatePlanComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private columnDefs1;
  private rowSelection;
  private rowSelection1;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationStartPage;
  private paginationNumberFormatter;
  private rowData;
  private rowData1;
  private context;
  private frameworkComponents;
  selecteddata;
  closeResult: string;
  productList;
  associatedPlan;
  plans = [];
  updatePlans = [];
  page=0;
  constructor(config: NgbModalConfig, private spinnerService: Ng4LoadingSpinnerService, private router: Router, private flashMessage: FlashMessagesService, private associateMappingComponent: AssociateMappingComponent, private modalService: NgbModal, private http: HttpClient, private globalServiceService: GlobalServiceService, private childMessageRenderer: ChildMessageRenderer) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.columnDefs = [
      { headerName: 'Plan ID', field: 'ratePlanId' },
      { headerName: 'Name', field: 'name' },
      { headerName: 'Bill Every', field: 'billEvery' },
      { headerName: 'Pricing Scheme', field: 'type' },
      { headerName: 'Status', field: 'isActive' },
      { headerName: 'Details', cellRenderer: "associateMappingComponent", colId: "params", width: 250 }
    ];
    this.rowSelection = "multiple";
    this.columnDefs1 = [
      { headerName: 'Products', field: 'productDispName' },

    ];
    this.rowSelection1 = "single";


    this.context = { componentParent: this };
    this.frameworkComponents = {
      childMessageRenderer: ChildMessageRenderer,
      associateMappingComponent: AssociateMappingComponent
    };

    this.rowGroupPanelShow = "always";
    this.pivotPanelShow = "always";
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }

  ngOnInit() {
    this.productList = this.globalServiceService.p_list;
    this.associatedPlan = this.globalServiceService.plan_list;
    this.onLoadData();
 
    this.gridApi.forEachNode((node) => {
      // if (node.childIndex == 0) {
      //   node.setSelected(true);
      // }
      // if (this.productList != undefined) {
      //   for (let i = 0; i < this.associatedPlan.length; i++) {
      //     for (let j = 0; j < this.productList[0].ratePlans.length; j++) {
      //       if (this.productList[0].ratePlans[j].uidpk == this.associatedPlan[i].uidpk && node.data.uidpk == this.productList[0].ratePlans[j].uidpk) {
      //         node.setSelected(true);
      //       }
      //     }
      //   }
      // }
    });
  }
  // onLoadData() {
  //   this.spinnerService.show();
  //   this.globalServiceService.getProducts().subscribe(data => {
  //     this.spinnerService.hide();
  //     this.rowData1 = data;
  //     this.rowData1 = this.rowData1.productList;
  //     if(this.productList == undefined){
  //       this.productList = this.rowData1;
  //     }
      
  //   })
  //   this.spinnerService.show();
  //   this.globalServiceService.getPlans(this.page).subscribe
  //     (data => {
  //       this.spinnerService.hide();
  //       this.rowData = data;
  //       if(this.associatedPlan == undefined){
  //         this.associatedPlan = this.rowData;
  //       }
      

  //     });
  // }
  onLoadData() {
    this.spinnerService.show();
    this.globalServiceService.getProducts().subscribe(data => {
      this.spinnerService.hide();
      this.rowData1 = data;
      this.rowData1 = this.rowData1.productList;
      if(this.productList == undefined){
        this.productList = this.rowData1;
      }
      
    })
    this.spinnerService.show();
    this.globalServiceService.getPlans(0).subscribe
      (data => {
        this.spinnerService.hide();
        this.rowData = data;
        this.rowData = this.rowData.ratePlanList;
        if(this.associatedPlan == undefined){
          this.associatedPlan = this.rowData;
        }
      

      });
  }
  onPageSizeChanged(newPageSize) {
    var inputElement = <HTMLInputElement>document.getElementById("page-size");
    var value = inputElement.value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.paginationGoToPage(1);
    
    this.gridApi.forEachNode((node) => {
      if (node.childIndex == 0) {
        node.setSelected(true);
      }
      // if (this.productList != undefined) {
      //   for (let i = 0; i < this.associatedPlan.length; i++) {
      //     for (let j = 0; j < this.productList[0].ratePlans.length; j++) {
      //       if (this.productList[0].ratePlans[j].uidpk == this.associatedPlan[i].uidpk && node.data.uidpk == this.productList[0].ratePlans[j].uidpk) {
      //         node.setSelected(true);
      //       }
      //     }
      //   }
      // }
      for (let i = 0; i < this.productList[0].ratePlans.length; i++) {
        for (let j = 0; j < this.associatedPlan.length; j++) {
          if (this.productList[0].ratePlans[i].uidpk == this.associatedPlan[j].uidpk && node.data.uidpk == this.productList[0].ratePlans[i].uidpk) {
            node.setSelected(true);
          }
        }
      }
    });

  }


  onRowClicked(event: any) {
    (<HTMLInputElement>document.getElementById("updateAsso")).disabled = true;
    this.selecteddata = event.data; 
    this.gridApi.forEachNode((node) => {
      node.setSelected(false);
      for (let i = 0; i < this.selecteddata.ratePlans.length; i++) {
        for (let j = 0; j < this.associatedPlan.length; j++) {
          if (this.selecteddata.ratePlans[i].uidpk == this.associatedPlan[j].uidpk && node.data.uidpk == this.selecteddata.ratePlans[i].uidpk) {
            node.setSelected(true);
          }
        }
      }
    });
  }
  onRowClicked1(event: any) {

  }
  onCellClicked(event: any) {
    //console.log('cell', event.data); 

  }
  onSelectionChanged(event: any) {
    //console.log("selection", event.data); 

  }
  onCellClicked1(event: any) {


    if (event.colDef.headerName == "Details") {
      (<HTMLInputElement>document.getElementById("updateAsso")).disabled = true;

      this.gridApi.forEachNode((node) => {
        if (node.data.uidpk == event.data.uidpk) {
          if (node.selected == true) {
            node.setSelected(false);
          } else {
            node.setSelected(true);
          }

        }

        // if (node.selected == true) {
        //     node.setSelected(false);
        // }


      });


    } else {
      (<HTMLInputElement>document.getElementById("updateAsso")).disabled = false;
      let arr = [];
      this.updatePlans = [];
      this.gridApi.forEachNode((node) => {
        if (node.selected == true) {
          arr.push(node.data);
        }
      });
      var filteredArray = arr.filter(function (item, pos) {
        return arr.indexOf(item) == pos;
      });
      //console.log(filteredArray);
      this.updatePlans = filteredArray;
    }

  }
  updateAssociation() {

    if (this.selecteddata == undefined) {
      this.selecteddata = this.productList[0];
    }

    if (this.selecteddata == undefined || this.selecteddata == "") {
      this.gridApi.forEachNode((node) => {
        if (node.selected == true) {
          node.setSelected(false);
        }
      });
      this.flashMessage.show('Select a product', { cssClass: 'alert-danger', timeout: 5000 });
    } else {
      this.spinnerService.show();
      this.globalServiceService.associatePlans(this.updatePlans, this.selecteddata.uidpk).subscribe
        (data => {
          this.spinnerService.hide();
          (<HTMLInputElement>document.getElementById("updateAsso")).disabled = true;
         
          for(let i=0;i<this.productList.length;i++){
            if(this.productList[i].productDispName == this.selecteddata.productDispName){
              this.productList[i].ratePlans=this.updatePlans;
            }
          }
          console.log(this.selecteddata.productDispName,this.productList,this.updatePlans);
          this.selecteddata = '';
          this.gridApi.forEachNode((node) => {
             for (let i = 0; i < this.updatePlans.length; i++) {
              if (node.data.uidpk == this.updatePlans[i].uidpk) {
                node.setSelected(true);
              }
            }
          });
         
          this.flashMessage.show('Successfully Associated product with Plan', { cssClass: 'alert-success', timeout: 5000 });
        },
        error => {
          this.spinnerService.show();
          this.flashMessage.show('Product Association with plan is unsuccessful', { cssClass: 'alert-danger', timeout: 5000 });

        });
    }
  }
  onSelectionChanged1(event: any) {

  }
  backToProduct() {
    this.router.navigate(['/product']);
  }
}
