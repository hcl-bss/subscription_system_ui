import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import {
  ModalsService
} from '../modal.service';
import {
  Ng4LoadingSpinnerService
} from 'ng4-loading-spinner';
import {
  NgbDatepickerConfig,
  NgbDateParserFormatter
} from '@ng-bootstrap/ng-bootstrap';
import {
  NgbDateFRParserFormatter
} from "../ngb-date-fr-parser-formatter";
import {FormGroup,FormBuilder,
  Validators,
  FormControl,
  FormArray,
  NgForm,
  MaxLengthValidator
} from '@angular/forms';
import {
  GlobalPropertiesService
} from "../global-properties.service";

@Component({
  selector: 'app-edit-plan',
  template: `
  <span><i (click)="open(content);invokeParentMethod()" class="fa fa-pencil-square-o fa-2" aria-hidden="true" style="cursor:pointer;"></i></span>
  <ng-template #content let-modal>
          <div class="modal-header" style="position: relative;">
              <flash-messages style="position:absolute;top:0;left:0;width:100%;"></flash-messages>
            <h4 class="modal-title" id="modal-basic-title">Edit Plan</h4>
            <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')" (click)="emptyRatePlanValues()">
              <span aria-hidden="true" >&times;</span>
            </button>
          </div>
    
          <div class="modal-body mng">
            <form>
              <div class="row">
                <div class="form-group">
                  <div class="col-lg-2 float-left">
                    <label for="planName"> Plan Name <span style="color:red;">*</span></label>
                  </div>
                  <div class="col-lg-4 float-left">
                    <input type="text" class="form-control form-control-sm col-lg-8" placeholder={{params.data.name}}  name="planName"
                      [(ngModel)]="params.data.name" autocomplete="off"   (input)="setupFeeCheck()"  (change)="setupFeeCheck()">
                  </div>
                  <div class="col-lg-2 float-left">
                    <label for="pcode">Code <span style="color:red;">*</span></label>
                  </div>
                  <div class="col-lg-4 float-left">
                  <span  *ngIf="!filterSearchFlag">
                  <input type="text" class="form-control form-control-sm"  placeholder={{params.data.ratePlanId}} name="planCode" [(ngModel)]="params.data.ratePlanId" autocomplete="off" (input)="setupFeeCheck()">
                    </span>
                    <span  *ngIf="filterSearchFlag">
                    <input type="text" disabled class="form-control form-control-sm"  placeholder={{params.data.ratePlanId}} name="planCode" [(ngModel)]="params.data.ratePlanId" autocomplete="off" (input)="setupFeeCheck()">
                      </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group">
                  <div class="col-lg-2 float-left">
                    <label for="billEvery">Bill Every <span style="color:red;">*</span></label>
                  </div>
                  <div class="col-lg-4 float-left">
                  <span  *ngIf="!filterSearchFlag">
                    <input type="text" maxlength="2" min="1" class="form-control form-control-sm dropselect float-left"
                      onkeypress='return event.charCode>=49 && event.charCode<=57' name="billEvery" min="1" placeholder={{params.data.billingCycleTerm}}
                      [(ngModel)]="params.data.billingCycleTerm" autocomplete="off">
                    <select class="form-control form-control-sm dropSelectTime float-left" style="margin-left:5px;"
                      id="billingTime" name="billingTime" [(ngModel)]="params.data.billEvery">             
                      <option [ngValue]="Select" hidden>{{params.data.billEvery}}</option>
                      <option *ngFor="let values of dropdownBillValues">{{values}}</option>  
                    </select>
                    </span>

                    <span  *ngIf="filterSearchFlag">
                    <input type="text" disabled maxlength="2" min="1" class="form-control form-control-sm dropselect float-left"
                      onkeypress='return event.charCode>=49 && event.charCode<=57' name="billEvery" min="1" placeholder={{params.data.billingCycleTerm}}
                      [(ngModel)]="params.data.billingCycleTerm" autocomplete="off">
                    <select class="form-control form-control-sm dropSelectTime float-left" style="margin-left:5px;"
                      id="billingTime" name="billingTime" [(ngModel)]="params.data.billEvery" disabled>             
                      <option [ngValue]="Select" hidden>{{params.data.billEvery}}</option>
                      <option *ngFor="let values of dropdownBillValues">{{values}}</option>  
                    </select>
                    </span>

                  </div>
                  <div class="col-lg-2 float-left">
                    <label for="freeTrial">Free Trial (in days)</label>
                  </div>
                  <div class="col-lg-4 float-left">
                  <span  *ngIf="!filterSearchFlag">
                    <input type="number" min="0" value="0" class="form-control form-control-sm" name="freeTrail"
                      [(ngModel)]="params.data.freeTrail" autocomplete="off" placeholder={{params.data.freeTrail}}  (input)="setupFeeCheck()"  (change)="setupFeeCheck()">
                  </span>
                  <span  *ngIf="filterSearchFlag">
                    <input type="number" min="0" value="0" class="form-control form-control-sm" name="freeTrail"
                      [(ngModel)]="params.data.freeTrail"  disabled autocomplete="off" placeholder={{params.data.freeTrail}}  (input)="setupFeeCheck()"  (change)="setupFeeCheck()">
                  </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group">
                  <div class="col-lg-2 float-left">
                    <label for="setupFee">Setup Fee</label>
                  </div>
                  <div class="col-lg-4 float-left">
                  <span  *ngIf="!filterSearchFlag">
                    <input type="number" class="form-control form-control-sm col-lg-8" name="setupFee"
                      [(ngModel)]="params.data.setUpFee" autocomplete="off" (input)="setupFeeCheck()" placeholder={{params.data.setUpFee}}  (change)="setupFeeCheck()">
                      </span>
                      <span  *ngIf="filterSearchFlag">
                      <input type="number" class="form-control form-control-sm col-lg-8" name="setupFee"
                        [(ngModel)]="params.data.setUpFee" disabled autocomplete="off" (input)="setupFeeCheck()" placeholder={{params.data.setUpFee}}  (change)="setupFeeCheck()">
                        </span>
                  </div>
                  <div class="col-lg-2 float-left">
                    <label for="price">Price<span style="color:red;">*</span></label>
                  </div>
                  <div class="col-lg-4 float-left">
                  <span  *ngIf="!filterSearchFlag">
                    <select class="form-control form-control-sm dropselectCurrency float-left"  
                      name="currencyType" [(ngModel)]="params.data.currencyCode">
                      
                      <option [ngValue]="Select" hidden>{{params.data.currencyCode}}</option>
                    <option *ngFor="let values of dropdownCurrencyValues">{{values}}</option>  
                    </select>
                    
                    <input type="number"  id="price_unit" class="form-control form-control-sm float-left" placeholder={{params.data.price}}
                      style="width:55%; margin-left:5px;" name="price" [(ngModel)]="params.data.price" autocomplete="off"  (input)="setupFeeCheck()"  (change)="setupFeeCheck()" >
                    </span>
                    <span  *ngIf="filterSearchFlag">
                    <select class="form-control form-control-sm dropselectCurrency float-left"  
                      name="currencyType" [(ngModel)]="params.data.currencyCode" disabled>                      
                    <option [ngValue]="Select" hidden selected>{{params.data.currencyCode}}</option>
                    <option *ngFor="let values of dropdownCurrencyValues">{{values}}</option>  
                    </select>
                    
                    <input type="number"  id="price_unit" class="form-control form-control-sm float-left" placeholder={{params.data.price}}
                      style="width:55%; margin-left:5px;" disabled name="price" [(ngModel)]="params.data.price" autocomplete="off"  (input)="setupFeeCheck()"  (change)="setupFeeCheck()" >
                      </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group">
                  <div class="col-lg-2 float-left">
                    <label for="billingCycles">Billing Cycles <span style="color:red;">*</span></label>
                  </div>
                  <div class="col-lg-4 float-left">
                  <span  *ngIf="!filterSearchFlag">
                      <div class="radio">                    
                        <label>    
                        <span  *ngIf="radioFlag">                  
                          <input type="radio" name="autoRenew" [value]="0" [(ngModel)]='AR' (change)="radio( 9999)" checked=”checked”> Autorenews
                          until cancelled.
                          </span>
                          <span  *ngIf="!radioFlag">                  
                          <input type="radio" name="autoRenew" [value]="0" [(ngModel)]='AR' (change)="radio( 9999)">Autorenews
                          until cancelled.
                          </span>
                        </label>
                      </div>

                    <div class="radio">
                        <label>
                        <span  *ngIf="radioFlag">    
                          <input type="radio"  name="autoRenew" [value]="1" [(ngModel)]='AR' 
                            (click)="radioinputboxfun()" > Expires after specified no of billing cycles.
                            </span>
                            <span  *ngIf="!radioFlag">    
                            <input type="radio"  name="autoRenew" [value]="1" [(ngModel)]='AR' checked=”checked”
                            (click)="radioinputboxfun()" checked=”checked” > Expires after specified no of billing cycles.
                            </span>
                        </label>

                      <div style="width:100%;border: 1px solid #bababa; padding:5%; box-sizing:border-box; display:inline-block;" *ngIf="radioinputbox">
                      <div>
                        <input type="number"  (input)="radio(billingCyclesInput)" class="form-control form-control-sm box " style="width: 100%;" name="billingCyclesInput"
                          [(ngModel)]='params.data.expireAfter' min="0" (input)="setupFeeCheck()"  (change)="setupFeeCheck()" >
                        </div>
                        <p style="font-size:10px;width: 100%;opacity:0.6; margin:0px;">Number of times the customer will be billed for a subscription of this plan.</p>
                      </div>
                    </div>
                    </span>

                    <span  *ngIf="filterSearchFlag">
                    <div class="radio">                    
                    <label>    
                    <span  *ngIf="radioFlag">                  
                      <input type="radio" disabled name="autoRenew" [value]="0" [(ngModel)]='AR' (change)="radio( 9999)" checked=”checked”> Autorenews
                      until cancelled.
                      </span>
                      <span  *ngIf="!radioFlag">                  
                      <input type="radio" disabled name="autoRenew" [value]="0" [(ngModel)]='AR' (change)="radio( 9999)">Autorenews
                      until cancelled.
                      </span>
                    </label>
                  </div>

                <div class="radio">
                    <label>
                    <span  *ngIf="radioFlag">    
                      <input type="radio" disabled name="autoRenew" [value]="1" [(ngModel)]='AR' 
                        (click)="radioinputboxfun()" > Expires after specified no of billing cycles.
                        </span>
                        <span  *ngIf="!radioFlag">    
                        <input type="radio" disabled name="autoRenew" [value]="1" [(ngModel)]='AR' checked=”checked”
                        (click)="radioinputboxfun()" checked=”checked” > Expires after specified no of billing cycles.
                        </span>
                    </label>

                  <div style="width:100%;border: 1px solid #bababa; padding:5%; box-sizing:border-box; display:inline-block;" *ngIf="radioinputbox">
                  <div>
                    <input type="number" disabled (input)="radio(billingCyclesInput)" class="form-control form-control-sm box " style="width: 100%;" name="billingCyclesInput"
                      [(ngModel)]='params.data.expireAfter' min="0" (input)="setupFeeCheck()"  (change)="setupFeeCheck()" >
                    </div>
                    <p style="font-size:10px;width: 100%;opacity:0.6; margin:0px;">Number of times the customer will be billed for a subscription of this plan.</p>
                  </div>
                </div>
                    </span>
                  </div>
                  <div class="col-lg-2 float-left">
                    <label for="unitOfMeasureId">UOM <span style="color:red;">*</span></label>
                  </div>
                  <div class="col-lg-4 float-left">
                  <span  *ngIf="!filterSearchFlag">
                    <select class="form-control form-control-sm"   name="unitOfMeasureId"
                    [(ngModel)]="unitOfMeasureId" style="width:40%">
                     
                    
                     <option [ngValue]="Select" hidden>{{params.data.type}}</option>
                    <option *ngFor="let values of dropdownUomValues">{{values.unitOfMeasure}}</option>  
                  </select>
                  </span>
                  <span  *ngIf="filterSearchFlag">
                  <select class="form-control form-control-sm"  disabled   name="unitOfMeasureId"
                  [(ngModel)]="unitOfMeasureId" style="width:40%">
                   
                  
                   <option [ngValue]="Select" hidden>{{params.data.type}}</option>
                  <option *ngFor="let values of dropdownUomValues">{{values.unitOfMeasure}}</option>  
                </select>
                </span>
                  </div>
                </div>
              </div>
  
  
              <div class="row">
                <div class="form-group">
                  <div class="col-lg-2 float-left">
                    <label for="pricingScheme">Pricing Scheme <span style="color:red;">*</span></label>
                  </div>
                  <div class="col-lg-4 float-left">
                  
                    <select class="form-control form-control-sm" disabled  name="volumePlaceholder"
                      [(ngModel)]="volumePlaceholder" (change)="pricingSchemeBox(volumePlaceholder)" style="width:46%">
                      
  
                      <option [ngValue]="Select" hidden>{{volumePlaceholder}}</option>
                      <option *ngFor="let values of dropdownPricingValues">{{values}}</option>  
                      <!-- <option>Volume</option>
                      <option>Tier</option>
                      <option>Package</option> -->
                    </select>
                   
                  </div>
                  <div class="col-lg-2 float-left">
  
                  </div>
                  <div class="col-lg-4 float-left">
  
                  </div>
                </div>
              </div>
  
              
              <div class="row">
                <div class="col-lg-12">
                  <div *ngIf="volumeDataShow" class="volume_box" style="padding:2% 2% 0 2%;">
                    <div class="col-lg-12" style=" text-align: center; padding: 0px;">
                      <div class="form-group" style="width:100%; display:inline-block;">
 
                        <form [formGroup]="invoiceForm" >
                          <div formArrayName="itemRows"> 
                              <div>    
                                  <div class="row" style="text-align:center">              
                                  <div class="form-group" style="text-align:left;">
                                    <div class="col-sm-3" style="display:inline-block">
                                    <label style="width:100%;">Starting Qty</label>
                                  </div>
                                  <div class="col-sm-3" style="display:inline-block">
                                    <label style="width:100%;">Ending Qty</label>
                                    </div>
                                    <div class="col-sm-3" style="display:inline-block">
                                    <label style="width:100%;">Price</label>
                                    </div>  
                                                         
                                </div></div></div>
                             
                          <div *ngFor="let itemrow of invoiceForm.controls.itemRows.controls; let i=index"  [formGroupName]="i">    
                          <div class="row" style="text-align:center">              
                          <div class="form-group" style="text-align:left;" >
                            <div class="col-sm-3" style="display:inline-block">                            
                            <input type="number" formControlName="startQty" class="form-control form-control-sm"  min="0">
                            </div>

                            <div class="col-sm-3" style="display:inline-block">                            
                              <input type="number" formControlName="endQty" class="form-control form-control-sm"  min="0">
                            </div>

                            <div class="col-sm-3" style="display:inline-block">                           
                            <input type="number" formControlName="price" class="form-control form-control-sm"  min="0">  
                            </div>                        
                          <a *ngIf="invoiceForm.controls.itemRows.controls.length > 1" (click)="deleteRow(i)" href="javascript:void(0)"><i class="fa fa-trash fa-2" aria-hidden="true"
                            style="color:red;"></i></a>
                           
                        </div>
                        
                      </div>
                      
                    </div>
                  <button type="button" (click)="addNewRow()" style="position: absolute;right: 0;top: 32px;" class="btn btn-primary">Add new Row</button>
                      </div>
                      
                    </form>
                  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" disabled id="saveAddPlan"
              (click)="addPlanData()">Save</button>
            <button type="button" class="btn btn-info" (click)="removeValues();modal.close('Save click')">Close</button>
  
          </div>
        </ng-template>
  `,
  styles: [
    `
    .headerStrip{
  
        border:2px solid #bababa; 
        border-radius: 5px; 
        /* padding:0px 10px;  */
        text-transform: none; 
        /* margin-top:0px; */
        background: lightgray;
        
    }
    
    .modal-body{
        width: 100%;
      }
    
    .dropselect{
        width: 20%;
    }
    
    .dropSelectTime{
        width:50%;
    }
    
    .dropselectCurrency{
        width:40%;
    }
    
    
    
    /* poo-up volume */
    .switch {
        position: relative;
        display: inline-block;
        width: 90px;
        height: 34px;
      }
      
      .switch input {display:none;}
      
      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #FF586B;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
      }
      
      input:checked + .slider {
        background-color: #0CC27E;
      }
      
      input:focus + .slider {
        box-shadow: 0 0 1px #2196F3;
      }
      
      input:checked + .slider:before {
        -webkit-transform: translateX(55px);
        -ms-transform: translateX(55px);
        transform: translateX(55px);
      }
      
      /*------ ADDED CSS ---------*/
      .on
      {
        display: none;
      }
      
      .on, .off
      {
        color: white;
        position: absolute;
        transform: translate(-50%,-50%);
        top: 50%;
      }
      
      .on 
      {
        left: 45%;
      }
      
      .off 
      {
        left: 55%;
      }
      
      input:checked+ .slider .on
      {display: block;}
      
      input:checked + .slider .off
      {display: none;}
      
      /*--------- END --------*/
      
      /* Rounded sliders */
      .slider.round {
        border-radius: 34px;
      }
      
      .slider.round:before {
        border-radius: 50%;}
    
        .modal-content{
         
          overflow: scroll !important;
        }
         .modal-body.mng .row .col-lg-12 label{ width: 20%; display: inline-block;}
         .modal-body.mng .row .col-lg-12 input{ width: 50%; display: inline-block;}
         .modal-body.mng .row .col-lg-12 .radio label{ width: 25%; display: inline-block;}
         .modal-body.mng .row .form-group{ width: 100%; display: inline-block;}
         .float-left{ float: left;}
         .modal-body.mng .row .form-group input{ max-width: 100%;}
         .volume_box{ padding: 2%; border: 2px solid #bababa; border-radius: 5px; width: 100%; display: inline-block; box-sizing: border-box;}
         .form-control{
           font-size: 12px;
         }

      `
  ]
 
})
export class EditPlanComponent implements ICellRendererAngularComp, OnInit  {
  public params: any;
  private gridApi;
  data;
  closeResult: string;
  submitted = false;
  volumeSection = false;
  volumeDetails;
  priceUnit;
  checkInput: boolean;
   






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
    volumeArr = [];
    hello;
    fetchValues;
    dropdownUomValues;  
    public invoiceForm: FormGroup;
    radioInputValue: any;
    dropdownCurrencyValues: any;
    dropdownPricingSchemeValues: any;
    planName: string;
    planCode: string;
    billEvery: string;
    billingTime: string;
    unitOfMeasureId: string;
    currencyType: string;
  //price: string;
    pricingSchemePlan: string;
  //freeTrial: string;
  //setupFee: string;
    dropdownPricingValues: any;
    dropdownBillEveryValues: any;
    dropdownBillValues: any;
    billingInput: any;
   // checkInput: boolean;
    radiovalue: string;
    billingCyclesInput: string;
    AR: number;
    planAllData;
    page=0;
    landingData: any;
    filterSearchFlag;
    volumePlaceholder;
    volumeDataShow=false;
    radioFlag;
  constructor(private spinnerService: Ng4LoadingSpinnerService,private _fb: FormBuilder,private modalService: NgbModal,config: NgbModalConfig, private flashMessage: FlashMessagesService,private globalServiceService:GlobalServiceService) { 
    
      //volume pop-up data
      this.invoiceForm = this._fb.group({
        itemRows: this._fb.array([this.initItemRows()])
    });
  }

  ngOnInit() {

    this.globalServiceService.fetchdropdownvalues().subscribe(
        data => {
            this.DrodownArray = data;
        });

    this.globalServiceService.fetchUomValues().subscribe(
        data => {
            this.dropdownUomValues = data;
        }
    )

    this.globalServiceService.fetchCurrencyValues().subscribe(
        data => {
            this.dropdownCurrencyValues = data;
        }
    )

    this.globalServiceService.fetchPricingSchemeValues().subscribe(
        data => {
            this.dropdownPricingSchemeValues = data;
            this.dropdownPricingValues = this.dropdownPricingSchemeValues.dropDownList;
        },
    )

    this.globalServiceService.fetchBillEveryValues().subscribe(
        data => {
            this.dropdownBillEveryValues = data;
            this.dropdownBillValues = this.dropdownBillEveryValues.dropDownList;
        },
    )


}
get formArr() {
  return this.invoiceForm.get('itemRows') as FormArray;
}

initItemRows() {
  return this._fb.group({
      startQty: [''],
      endQty: [''],
      price: [''],
  });
}

addNewRow() {
  this.formArr.push(this.initItemRows());
}

deleteRow(index: number) {
  this.formArr.removeAt(index);
}


dropDown(producttype) {
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

  agInit(params: any): void {
    this.params = params;
    this.data = this.params.data;
    
    //console.log("@@@@@@@",this.data);
  }
  public invokeParentMethod() {
    this.filterSearchFlag=this.params.data.transactionFlag;
    this.volumePlaceholder=this.params.data.pricingScheme;
    this.radioParam=this.params.data.expireAfter;
    if(this.radioParam=="9999"){
      this.radioinputbox=false;
      this.radioFlag=true;
    }else{
      this.radioinputbox=true;
      this.radioFlag=false;
    }
    // if(this.radioParam==" 9999"){
    //   this.radioFlag=true;
    //   this.radioinputbox=false;
    // }else{
    //   this.radioFlag=false;
    //   this.radioinputbox=true;
    // }
    if(this.volumePlaceholder=="VOLUME"){
      this.volumeDataShow=true;
    }else{
      this.volumeDataShow=false;
    }
    console.log("this.invoiceForm",this.invoiceForm.value.itemRows.push(this.params.data.ratePlanVolumeDtoList));
    console.log("@@@@@@@",this.data);
    
  
  }

  refresh(): boolean {
    return false;
  }
 
    price(price: any) {
        throw new Error("Method not implemented.");
    }
    setupFee(setupFee: any) {
        throw new Error("Method not implemented.");
    }
    freeTrial(freeTrial: any) {
        throw new Error("Method not implemented.");
    }

    onQuickFilterChanged() {
      var inputElement = < HTMLInputElement > document.getElementById("quickFilter");
      this.gridApi.setQuickFilter(inputElement.value);
  }


  onBtExport() {
      var params = {
          fileName: "usermanagement",
      };
      this.gridApi.exportDataAsCsv(params);
  }



  pricingSchemeBox(x) {
      //console.log(x);
      if (x === "VOLUME") {
          this.volumePricingScheme = true;
          (document.getElementById("price_unit") as HTMLInputElement).disabled = true;
      } else {
          this.volumePricingScheme = false;
          (document.getElementById("price_unit") as HTMLInputElement).disabled = false;
      }


  }

  radio(radiovalue) {
      if (radiovalue == " 9999") {
          this.radioParam = "";
          this.radioParam =  9999;
          this.radioinputbox = false;

      } else {
          this.radioParam = "";
          this.radioParam = radiovalue;
          this.radioinputbox = true;
      }
  }

  addPlanData() {
   
    console.log(this.params.data.billEvery,this.params.data.billingCycleTerm,this.params.data.currencyCode,this.radioParam, this.params.data.freeTrail
      , this.params.data.isActive ,this.params.data.name,this.params.data.price,this.volumePlaceholder,this.params.data.ratePlanId,this.params.data.ratePlanVolumeDtoList  ,this.params.data.setUpFee,
      this.params.data.transactionFlag,this.params.data.type,this.params.data.uidpk);
    // updateRatePlan(billEvery,billingCycleTerm,currencyCode,expireAfter,freeTrail,isActive,name,
    //   price,pricingScheme,ratePlanId,ratePlanVolumeDtoList,setUpFee,transactionFlag,type,uidpk){
      
      // if (billingTime == undefined) {
      //     billingTime = "WEEK"
      // }

      // if (currencyType == undefined) {
      //     currencyType = "INR"
      // }

      // if (pricingSchemePlan == undefined) {
      //     pricingSchemePlan = "UNIT"
      // }

      // if (this.radioParam == undefined) {
      //     this.radioParam = " 9999";
      // }
      // // if(this.volumePricingScheme == true)
      // // if (planName == undefined || planCode == undefined || billEvery == undefined || billingTime == undefined || pricingSchemePlan == undefined || unitOfMeasureId == undefined || currencyType == undefined || price==undefined) {

      // //   this.flashMessage.show('All fields are mandatory to add new plan!!', {
      // //     cssClass: 'alert-danger',
      // //     timeout: 5000
      // //   });
      // // } 
      // // else {
      // if (pricingSchemePlan == "VOLUME") {
      //     price = undefined;
      //     this.volumeArr = this.invoiceForm.value.itemRows;
      //     if (planName == undefined || planCode == undefined || billEvery == undefined || billingTime == undefined || pricingSchemePlan == undefined || unitOfMeasureId == undefined || currencyType == undefined || this.radioParam == undefined) {

      //         this.flashMessage.show('All * fields are mandatory to add new plan!!', {
      //             cssClass: 'alert-danger',
      //             timeout: 5000
      //         });
      //         this.validQty = false;
      //     } else
      //     if (this.invoiceForm.value.itemRows[0].startQty == "" || this.invoiceForm.value.itemRows[0].endQty == "" || this.invoiceForm.value.itemRows[0].price == "") {
      //         this.flashMessage.show('Fill the Start Qty,End Qty and Price!!', {
      //             cssClass: 'alert-danger',
      //             timeout: 5000
      //         });
      //         this.validQty = false;
      //     } else {
      //         for (let x = 0; x < this.invoiceForm.value.itemRows.length; x++) {
      //             if (this.invoiceForm.value.itemRows[x].startQty == "" || this.invoiceForm.value.itemRows[x].endQty == "" || this.invoiceForm.value.itemRows[x].price == "" ||
      //                 this.invoiceForm.value.itemRows[x].startQty == null || this.invoiceForm.value.itemRows[x].endQty == null || this.invoiceForm.value.itemRows[x].price == null) {
      //                 this.flashMessage.show('Fill the Start Qty,End Qty and Price!!', {
      //                     cssClass: 'alert-danger',
      //                     timeout: 5000
      //                 });
      //                 this.validQty = false;
      //                 break;
      //             } else if (this.invoiceForm.value.itemRows[x].startQty >= this.invoiceForm.value.itemRows[x].endQty) {
      //                 this.flashMessage.show('Starting quantity should be less than ending quantity!!', {
      //                     cssClass: 'alert-danger',
      //                     timeout: 5000
      //                 });
      //                 this.validQty = false;
      //                 break;
      //             } else {
      //                 // for(let x=0;x<this.invoiceForm.value.itemRows.length;x++){
      //                 if (this.invoiceForm.value.itemRows[x + 1] != undefined) {
      //                     if (this.invoiceForm.value.itemRows[x + 1].startQty == "" || this.invoiceForm.value.itemRows[x + 1].endQty == "" || this.invoiceForm.value.itemRows[x + 1].price == "" ||
      //                         this.invoiceForm.value.itemRows[x + 1].startQty == null || this.invoiceForm.value.itemRows[x + 1].endQty == null || this.invoiceForm.value.itemRows[x + 1].price == null) {
      //                         this.flashMessage.show('Fill the Start Qty,End Qty and Price!!', {
      //                             cssClass: 'alert-danger',
      //                             timeout: 5000
      //                         });
      //                         this.validQty = false;
      //                         break;
      //                     } else if ((this.invoiceForm.value.itemRows[x].endQty + 1) == this.invoiceForm.value.itemRows[x + 1].startQty) {
      //                         this.validQty = true;
      //                     } else {
      //                         this.flashMessage.show('Enter valid entries!!', {
      //                             cssClass: 'alert-danger',
      //                             timeout: 5000
      //                         });
      //                         this.validQty = false;
      //                         break;
      //                     }
      //                 } else {
      //                     this.validQty = true;
      //                 }
      //                 //   }
      //             }
      //         }
      //     }
      // } else {
      //     if (planName == undefined || planCode == undefined || billEvery == undefined || billingTime == undefined || pricingSchemePlan == undefined || unitOfMeasureId == undefined || currencyType == undefined || price == undefined || this.radioParam == undefined) {

      //         this.flashMessage.show('All * fields are mandatory to add new plan!!', {
      //             cssClass: 'alert-danger',
      //             timeout: 5000
      //         });
      //         this.validQty = false;
      //     } else {
      //         this.validQty = true;
      //     }

      // }

      // if (this.validQty == true && this.checkInput == true) {

      //     this.spinnerService.show();
      //     this.globalServiceService.addPlan(planName, planCode, billEvery, billingTime, pricingSchemePlan, this.volumeArr, currencyType, price, this.radioParam, freeTrial, setupFee, unitOfMeasureId).subscribe(
      //         data => {
      //             //console.log(data);
      //             this.rowData = [];
      //             this.volumeArr = [];

      //             this.flashMessage.show('New Plan added successfully!!', {
      //                 cssClass: 'alert-success',
      //                 timeout: 10000
      //             });
      //             // this.planName = "";
      //             // this.planCode = "";
      //             // this.billEvery = "";
      //             // this.billingTime = "WEEK";
      //             // this.unitOfMeasureId = "Select";
      //             // this.currencyType = "INR";
      //             // this.price = "";
      //             // this.pricingSchemePlan = "UNIT";
      //             // this.freeTrial = "";
      //             // this.setupFee = "";
      //             // this.radioinputbox = false;
      //             // this.volumePricingScheme = false;
      //             // this.radioParam = "";
      //             // this.radiovalue = "";
      //             // this.billingCyclesInput = "";
      //             this.AR = 0;
      //         },
      //         error => {

      //             this.spinnerService.hide();


      //         });
      // } else {

      // }
  }

  val(pricevol, x, startingQuantity) {
      //console.log(pricevol, x, startingQuantity);
  }

  radioinputboxfun() {

      this.radioinputbox = true;
  }

  removeDuplicates(originalArray, prop) {
      var newArray = [];
      var lookupObject = {};

      for (var i in originalArray) {
          lookupObject[originalArray[i][prop]] = originalArray[i];
      }

      for (i in lookupObject) {
          newArray.push(lookupObject[i]);
      }
      return newArray;
  }


  removeValues() {
      this.planName = "";
      this.planCode = "";
      this.billEvery = "";
      this.billingTime = "WEEK";
      this.unitOfMeasureId = "Select";
      this.currencyType = "INR";
    //  this.price = "";
      this.pricingSchemePlan = "UNIT";
     // this.freeTrial = "";
      //this.setupFee = "";
      this.radioinputbox = false;
      this.volumePricingScheme = false;
      this.radioParam = "";
      this.radiovalue = "";
      this.billingCyclesInput = "";
      this.AR = 0;
  }

  emptyRatePlanValues() {
      this.planName = "";
      this.planCode = "";
      this.billEvery = "";
      this.billingTime = "WEEK";
      this.unitOfMeasureId = "";
      this.currencyType = "INR";
     // this.price = "";
      this.pricingSchemePlan = "UNIT";
     // this.freeTrial = "";
      //this.setupFee = "";
      this.radioinputbox = false;
      this.volumePricingScheme = false;
      this.radioParam = "";
      this.radiovalue = "";
      this.billingCyclesInput = "";
      this.AR = 0;

      //this.initItemRows();
  }

  // priceCheck(){
  //   let price = Number(this.price);
  //   if(price<0 || price>10000){
  //     this.flashMessage.show('Please check the price !!', {
  //       cssClass: 'alert-danger',
  //       timeout: 2000
  //     });
  //   }else{
  //     ////console.log("right",x);
  //   }

  // }

  setupFeeCheck() {
      let setup = Number(this.setupFee);
      let freetrial = Number(this.freeTrial);
      let price = Number(this.price);
      if (this.planCode == undefined) {
          this.planCode = "";
      }
      if (this.planName == undefined) {
          this.planName = "";
      }

      if (setup < 0 || setup > 1000) {
          this.flashMessage.show('Setup fees should be less than 1000 !!', {
              cssClass: 'alert-danger',
              timeout: 2000
          });
          this.checkInput = false;
          ( < HTMLInputElement > document.getElementById("saveAddPlan")).disabled = true;
      } else if (freetrial < 0 || freetrial > 100) {
          this.flashMessage.show('Free Trial cant exceed 100 days !!', {
              cssClass: 'alert-danger',
              timeout: 2000
          });
          this.checkInput = false;
          ( < HTMLInputElement > document.getElementById("saveAddPlan")).disabled = true;
      } else
      if (this.planName.length < 0 || this.planName.length > 10) {
          this.flashMessage.show('Plan name cant exceed 10 characters !!', {
              cssClass: 'alert-danger',
              timeout: 2000
          });
          this.checkInput = false;
          ( < HTMLInputElement > document.getElementById("saveAddPlan")).disabled = true;
      } else
      if (this.planCode.length < 0 || this.planCode.length > 50) {
          this.flashMessage.show('Plan code cant exceed 50 characters !!', {
              cssClass: 'alert-danger',
              timeout: 2000
          });
          this.checkInput = false;
          ( < HTMLInputElement > document.getElementById("saveAddPlan")).disabled = true;

      } else if (price < 0 || price > 10000) {
          this.flashMessage.show('Price should be less than 10000 !!', {
              cssClass: 'alert-danger',
              timeout: 2000
          });
          this.checkInput = false;
          ( < HTMLInputElement > document.getElementById("saveAddPlan")).disabled = true;
      } else
      if (this.radioParam < 0 || this.radioParam > 1000) {
          this.flashMessage.show('Billing cycles cant exceed 1000 !!', {
              cssClass: 'alert-danger',
              timeout: 2000
          });
          this.checkInput = false;
          ( < HTMLInputElement > document.getElementById("saveAddPlan")).disabled = true;
      } else {
          this.checkInput = true;

          ( < HTMLInputElement > document.getElementById("saveAddPlan")).disabled = false;
      }
      console.log(this.radioParam);
  }
  priceQtychanges(value,index){
    console.log(value,index);
  }
  startQtychanges(value,index){
    console.log(value,index);
  } 
  endQtychanges(value,index){
    console.log(value,index);
  }
}