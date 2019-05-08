import { Component, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons,NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './_helpers/must-match.validator';
import { GlobalServiceService } from './global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-associate-mapping',
  template: `<ng-template #content let-modal>
  <div class="modal-header">
     <h4 class="modal-title" id="modal-basic-title">Plan-{{this.params.data.ratePlanId}}</h4>
     <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')">
     <span aria-hidden="true">&times;</span>
     </button>
  </div>
  <flash-messages></flash-messages>
  <div class="modal-body" style="font-size:12px;">
     <form>
       <div class="row">
          <div class="col-lg-3">
          <label>Plan Name: </label>
          </div>
          <div class="col-lg-3">{{this.params.data.name}}</div>
          <div class="col-lg-3">
          <label>Plan Code: </label>
          </div>
          <div class="col-lg-3">{{this.params.data.ratePlanId}}</div>
       </div>
       
       <div class="row">
          <div class="col-lg-3">
          <label>Bill Every: </label>
          </div>
          <div class="col-lg-3">{{this.params.data.billEvery}}</div>
          <div class="col-lg-3">
          <label>Pricing Scheme: </label>
          </div>
          <div class="col-lg-3">{{this.params.data.pricingScheme}}</div>
       </div>
       <div class="row">
         
       </div>  


       

    


     <div class="row">
     <div class="col-lg-3">
     <label>Billing Cycle: </label>
     </div>
     <div class="col-lg-3">{{this.params.data.billingCycleTerm}}</div>

     <div class="col-lg-3">
     <label>Free Trial: </label>
     </div>
     <div class="col-lg-3">{{this.params.data.freeTrail}}</div>
  </div>
 
  <div class="row">
     <div class="col-lg-3">
     <label>Setup Fees: </label>
     </div>
     <div class="col-lg-3">{{this.params.data.setUpFee}}</div>

     <div class="col-lg-3">
     <label>Plan Description: </label>
     </div>
     <div class="col-lg-3">{{this.params.data.name}}</div>
  </div>

  <div class="row" *ngIf="priceUnit">
     <div class="col-lg-3">
     <label>Price: </label>
     </div>
     <div class="col-lg-3">{{this.params.data.price}}</div>     
  </div>

<div  *ngIf="volumeSection">
    <div class="row" style="border-top:2px solid #117a8b !important; margin-top:10px;">
      <div class="col-lg-12">
      <label style="width:100%; padding:10px 0; margin-bottom:10px; color:#117a8b !important; font-size:13px; text-transform: uppercase; font-weight:bold;">Volume Details:- </label>
    </div> 
  </div>  

<div class="row">
  <div class="col-lg-12">
          <table class="table table-bordered">
              <thead>
                  <tr>
                    <th>Start Qty:</th>
                    <th>End Qty:</th>
                    <th>Price:</th>
                  </tr>
              </thead>
              <tbody>
                <tr *ngFor="let data of volumeDetails">
                  <td>{{data.startQty}}</td>
                  <td>{{data.endQty}}</td>
                  <td>{{data.price}}</td>
                </tr>
              </tbody>
          </table>
  </div>
</div>
</div>
     </form>
  </div>
  <div class="modal-footer">
    
  </div>
</ng-template>
<span><button style="height: 20px; font-size:12px;padding: 0 10px;" (click)="open(content)" (click)="invokeParentMethod()" class="btn btn-info">More Details</button></span>`,
  styles: [
    `
    .modal-body .row .col-lg-3 label, .modal-body .row .col-lg-2 label{ font-weight:bold;}
        .modal-body {
          background: #fff;
          margin: 0px auto;
          width: 100%;}
          .onoffswitch {
            position: relative; width: 50px;
            -webkit-user-select:none; -moz-user-select:none; -ms-user-select: none;
        }
        .onoffswitch-checkbox {
            display: none;
        }
        .onoffswitch-label {
            display: block; overflow: hidden; cursor: pointer;
            border: 1px solid #17a2b8; border-radius: 20px;
        }
        .onoffswitch-inner {
            display: block; width: 200%; margin-left: -100%;
            transition: margin 0.3s ease-in 0s;
        }
        .onoffswitch-inner:before, .onoffswitch-inner:after {
            display: block; float: left; width: 50%; height: 18px; padding: 0; line-height: 20px;
            font-size: 14px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;
            box-sizing: border-box;
        }
        .onoffswitch-inner:before {
            content: "Active";
            padding-left: 4px;
            background-color: #17a2b8; color: #FFFFFF; font-size:9px;
        }
        .onoffswitch-inner:after {
            content: "Deactive";
            padding-right: 4px;
            background-color: #EEEEEE; color: #999999;font-size:9px;
            text-align: right;
        }
        .onoffswitch-switch {
            display: block; width: 9px; height:9px; margin: 6px;
            background: #FFFFFF;
            position: absolute; top: 0; bottom: 0;
            right: 30px;
            border: 1px solid #999999; border-radius: 20px;
            transition: all 0.3s ease-in 0s; 
        }
        .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
            margin-left: 0;
        }
        .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
            right: 0px; 
        } 
          
        #cnfmpwd{
          borderColor:"red"
      }
      .onoffswitch-switch {
        right: 37px;
      }
      .onoffswitch {
        width: 55px;
      }

      `
  ]
 
})
export class AssociateMappingComponent implements ICellRendererAngularComp, OnInit  {
  public params: any;
  private gridApi;
  data;
  closeResult: string;
  registerForm: FormGroup;
  submitted = false;
  volumeSection = false;
  volumeDetails;
  priceUnit;
  constructor(private modalService: NgbModal,config: NgbModalConfig, private flashMessage: FlashMessagesService,private formBuilder: FormBuilder, private globalServiceService:GlobalServiceService) { 
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    if(this.params.data.pricingScheme == "VOLUME"){
      this.volumeSection = true;
      this.priceUnit=false;
    }else{
      this.volumeSection = false;
      this.priceUnit=true;
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
    this.data = this.params.data.userId;
    
  }
  public invokeParentMethod() {
    //console.log(this.params.data); 
    //console.log("ratePlanVolumeDtoList",this.params.data.ratePlanVolumeDtoList) ;
    if(this.params.data.ratePlanVolumeDtoList!= null || this.params.data.ratePlanVolumeDtoList!= undefined){
      this.volumeDetails=this.params.data.ratePlanVolumeDtoList;
    }
  }

  refresh(): boolean {
    return false;
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }
 
}