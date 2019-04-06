import { Component, OnInit } from '@angular/core';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ChildMessageRenderer } from "../child-message-renderer.component";
import { ModalsService } from '../modal.service';
import { NgbModal, ModalDismissReasons,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgbDatepickerConfig, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from "../ngb-date-fr-parser-formatter";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm, MaxLengthValidator } from '@angular/forms';
import {GlobalPropertiesService} from "../global-properties.service";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }]
})

export class PlanComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowSelection;
  private rowGroupPanelShow;
  private pivotPanelShow;
  private paginationPageSize;
  private paginationStartPage;
  private paginationNumberFormatter;
  private rowData;
  private context;
  private frameworkComponents;
  closeResult: string;
  producttype;
  name;
  description;
  sku;
  startDate;
  endDate;
  DrodownArray;
  code;
  P_code_Type;
  numericArray = [];
  radioinputbox = false;
  volumePricingScheme = false;
  radioParam;
  addClicked = 0;
  addArr = [];
  volumeData = [];

  addForm: FormGroup;
  rows: FormArray;
  rows1: FormArray;
  itemForm: FormGroup;
  resultVolume;
  validQty: boolean;
  volumeArr=[];
  hello;
  fetchValues;

  public invoiceForm: FormGroup;


  constructor(private globalPropertiesService:GlobalPropertiesService,private _fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private router: Router, private modalService: NgbModal, private flashMessage: FlashMessagesService, private childMessageRenderer: ChildMessageRenderer, private globalServiceService: GlobalServiceService,config: NgbModalConfig) 
    {
      config.backdrop = 'static';
      config.keyboard = false;
      this.columnDefs = [
        { headerName: 'Plan ID', field: 'planID', editable: true },
        { headerName: 'Name', field: 'planName', editable: true },
        { headerName: 'Plan Code', field: 'planCode', editable: true },
        { headerName: 'Bill Every', field: 'billEvery', editable: true },
        { headerName: 'Type', field: 'planType', editable: true },
        { headerName: 'Status', field: 'planStatus', editable: true },
        { headerName: 'Details', field: 'planDetails', editable: true },
        
      ];
      // this.rowData = this.createRowData();
      this.context = { componentParent: this };
      this.frameworkComponents = {
        childMessageRenderer: ChildMessageRenderer
      };
      this.rowSelection = "multiple";
      this.rowGroupPanelShow = "always";
      this.pivotPanelShow = "always";
      this.paginationPageSize = 10;
      // this.paginationStartPage =  0;
      this.paginationNumberFormatter = function (params) {
        return "[" + params.value.toLocaleString() + "]";
      };
  
      //volume pop-up data
      this.invoiceForm = this._fb.group({
        itemRows: this._fb.array([this.initItemRows()])
      });
  }

  ngOnInit(){


    this.fetchValues=this.globalPropertiesService.getPropertyValues();

    this.globalServiceService.fetchdropdownvalues().subscribe(
      data => {
        this.DrodownArray = data;
        console.log(this.DrodownArray);
      });
    for (let i = 1; i <= 20; i++) {
      this.numericArray.push(i);
    }



    //volume pop-up data
    this.invoiceForm = this._fb.group({
      itemRows: this._fb.array([this.initItemRows()])
    });

   
  }


  get formArr() {
    return this.invoiceForm.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
      sqty: [''],
      eqty: [''],
      qty: [''],
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

 
  

  // onAddRow() {
  //   this.rows.push(this.createItemFormGroup());
  // }
  // onRemoveRow(rowIndex: number) {
  //   this.rows.removeAt(rowIndex);
  // }
  // createItemFormGroup():
  //   FormGroup {
  //   return this.fb.group({
  //     startingQty: null,
  //     endingQty: null,
  //     price: null
  //   });
  // }

  // onAddRow1() {
  //   this.rows1.push(this.createItemFormGroup1());
  // }
  // onRemoveRow1(rowIndex: number) {
  //   this.rows1.removeAt(rowIndex);
  // }
  // createItemFormGroup1():
  //   FormGroup {
  //   return this.fb.group({
  //     startingQty1: null,
  //     endingQty1: null,
  //     price1: null
  //   });
  // }


  dropDown(producttype) {
    console.log(producttype);
    for (let i = 0; i < this.DrodownArray.length; i++) {
      if (this.DrodownArray[i].productType == producttype) {
        this.P_code_Type = this.DrodownArray[i].productTypeCode;
      }
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      

    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  onPageSizeChanged(newPageSize) {
    var inputElement = <HTMLInputElement>document.getElementById("page-size");
    var value = inputElement.value;
    this.gridApi.paginationSetPageSize(Number(value));
  }

   onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   this.globalServiceService.usermanagementCalling().subscribe(
  //     data => {
  //       this.rowData = data;

  //       params.api.paginationGoToPage(1);
  //     });
    
  }
  onQuickFilterChanged() {
    var inputElement = <HTMLInputElement>document.getElementById("quickFilter");
    this.gridApi.setQuickFilter(inputElement.value);
  }

  
  onBtExport() {
   
    var params = {
      fileName: "usermanagement",
     
    };
    this.gridApi.exportDataAsCsv(params);
  }

  isValid(): boolean {
    if (this.router.url != '/product/import') {
      return true;
    }
    return false;
  }

  pricingSchemeBox(x) {
    console.log(x);
    if (x === "Volume") {
      this.volumePricingScheme = true;
      (document.getElementById("price_unit") as HTMLInputElement).disabled = true;
    }
    else {
      this.volumePricingScheme = false;
      (document.getElementById("price_unit") as HTMLInputElement).disabled = false;
    }


  }
 
  radio(radiovalue) {
    this.radioParam = radiovalue;
    console.log("this.radioParam",this.radioParam);
    if (radiovalue == "AR") {
      this.radioinputbox = false;
    } else {
      this.radioinputbox = true;
    }
  }

  addPlanData(planName, planCode, billEvery, billingTime, billingCyclesInput, planDescription, currencyType, price, pricingSchemePlan, freeTrial, setupFee) {
  console.log(this.invoiceForm.value);
    if(billingTime == undefined){
      billingTime = "Month(s)"
    }

    if(currencyType == undefined){
      currencyType = "INR"
    }

    if(pricingSchemePlan == undefined) {
      pricingSchemePlan = "Unit"
    }

    if (planName == undefined || planCode == undefined || billEvery == undefined || billingTime == undefined || pricingSchemePlan == undefined || planDescription == undefined || currencyType == undefined || price == undefined) {
      this.flashMessage.show('All fields are mandatory to add new plan!!', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
    } 
    else {
      if(pricingSchemePlan=="Volume"){     
       if(this.invoiceForm.value.itemRows[0].sqty==""  || this.invoiceForm.value.itemRows[0].eqty==""  || this.invoiceForm.value.itemRows[0].qty==""){
        this.flashMessage.show('Please check the entry details', {
          cssClass: 'alert-danger',
          timeout: 5000
        });
       }
      else{
        for(let x=0;x<this.invoiceForm.value.itemRows.length;x++){
          if(this.invoiceForm.value.itemRows[x].sqty>this.invoiceForm.value.itemRows[x].eqty){ 
            this.flashMessage.show('Start quantity shold be less than end quantity', {
              cssClass: 'alert-danger',
              timeout: 5000
            });
          }else{
            for(let x=0;x<this.invoiceForm.value.itemRows.length;x++){
            if(this.invoiceForm.value.itemRows[x+1]!=undefined){
              if((this.invoiceForm.value.itemRows[x].eqty + 1)==this.invoiceForm.value.itemRows[x+1].sqty){
                this.validQty=true;
              }
              else{
                this.validQty=false;
              }
            }
            }
          }
        }
      }
      }else{
        this.validQty=true
      }
     
      if(this.validQty==true){
        this.spinnerService.show();
        this.globalServiceService.addPlan(planName,planCode,billEvery,billingTime,pricingSchemePlan,this.volumeArr,currencyType,price,this.radioParam,billingCyclesInput,freeTrial,setupFee,planDescription).subscribe(
          data => {        
          console.log(data);
          this.rowData=[];
          this.volumeArr=[];
          // this.globalServiceService.usermanagementCalling().subscribe(
          //   data => {
          //     this.spinnerService.hide();
          //     this.rowData = data;  
          //     this.producttype="";
          //     this.name="";
          //     this.description="";
          //     this.sku="";
          //     this.startDate="";
          //     this.endDate="";
  
          //   });
  
          this.flashMessage.show('New Plan added successfully!!', { cssClass: 'alert-success', timeout: 10000 });
          },
        error=>{
     
          this.spinnerService.hide();
  
  
        });
      }else{
        this.flashMessage.show('Please check the entry filled..!!', {
          cssClass: 'alert-danger',
          timeout: 5000
        });
      }
     
    }
  }

  val(pricevol, x, startingQuantity) {
    console.log(pricevol, x, startingQuantity);
  }

  radioinputboxfun() {

    this.radioinputbox = true;
  }

  removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject  = {};

    for(var i in originalArray) {
       lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for(i in lookupObject) {
        newArray.push(lookupObject[i]);
    }
     return newArray;



   
}
}

