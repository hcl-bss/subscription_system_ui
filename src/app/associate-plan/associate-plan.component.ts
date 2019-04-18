import { Component, OnInit } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { ModalsService } from '../modal.service';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { HttpClient } from "@angular/common/http";
import { ChildMessageRenderer } from "../child-message-renderer.component";
import { NgbModal, ModalDismissReasons,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AssociateMappingComponent } from '../associate-mapping.component';
import { Router } from "@angular/router";
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
  constructor(  config: NgbModalConfig,private router: Router,private flashMessage: FlashMessagesService, private associateMappingComponent: AssociateMappingComponent, private modalService: NgbModal, private http: HttpClient, private globalServiceService: GlobalServiceService, private childMessageRenderer: ChildMessageRenderer) {
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

    this.onLoadData();
    
  }
  onLoadData() {
    this.globalServiceService.getProducts().subscribe(data => {
      this.rowData1 = data;
      this.rowData1 = this.rowData1.productList;
      this.productList = this.rowData1;
    });

    this.globalServiceService.getPlans().subscribe
      (data => {
        this.rowData = data;
        this.associatedPlan = this.rowData;
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
          if (this.productList != undefined) {
              for (let i = 0; i < this.associatedPlan.length; i++) {
                  for (let j = 0; j < this.productList[0].ratePlans.length; j++) {
                      if (this.productList[0].ratePlans[j].uidpk == this.associatedPlan[i].uidpk && node.data.uidpk == this.productList[0].ratePlans[j].uidpk) {
                          node.setSelected(true);
                      }
                  }
              }
          }
      });
  }


  onRowClicked(event: any) {
    this.selecteddata = event.data;
    console.log(this.selecteddata);
    this.gridApi.forEachNode((node) => {
      node.setSelected(false);
      for (let i = 0; i < this.selecteddata.ratePlans.length; i++) {
        for (let j = 0; j < this.associatedPlan.length; j++) {
          if (this.selecteddata.ratePlans[i].uidpk == this.associatedPlan[j].uidpk && node.data.uidpk == this.selecteddata.ratePlans[i].uidpk) {
            node.setSelected(true);

          } else {
            //node.setSelected(false);
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
       if(node.data.uidpk==event.data.uidpk){
          if (node.selected == true) {
              node.setSelected(false);
          }else{
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
      console.log(filteredArray);
      this.updatePlans = filteredArray;
    }

  }
  updateAssociation() {
    console.log(this.selecteddata);
    if(this.selecteddata==undefined){
      this.selecteddata=this.productList[0];
    }
    console.log(this.productList[0]);
    if (this.selecteddata == undefined || this.selecteddata=="") {
      this.gridApi.forEachNode((node) => {
        if (node.selected == true) {
          node.setSelected(false);
        }
      });
      this.flashMessage.show('Select a product', { cssClass: 'alert-danger', timeout: 5000 });
    } else {
      this.globalServiceService.associatePlans(this.updatePlans, this.selecteddata.uidpk).subscribe
        (data => {
          (<HTMLInputElement>document.getElementById("updateAsso")).disabled = true;
          this.selecteddata='';
          //this.onLoadData();         
          window.location.reload();
           this.flashMessage.show('Successfully Associated product with Plan', { cssClass: 'alert-success', timeout: 5000 });
        },
          error => {
            this.flashMessage.show('Product Association with plan is unsuccessful', { cssClass: 'alert-danger', timeout: 5000 });
       
          });
    }
  }
  onSelectionChanged1(event: any) {
  
  }
  backToProduct(){
    this.router.navigate(['/product']);
  }
}
