import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'child-cell',
  template: `
<span style="float:left;margin-right: 3px;margin-top: 4px;">
<div class="onoffswitch">
<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" [checked]="chekedFlag" id="{{params.data.uidpk}}">
<label class="onoffswitch-label" for="{{params.data.uidpk}}" (click)="ActivateDeactivate()">
      <span class="onoffswitch-inner"></span>
      <span class="onoffswitch-switch"></span>
  </label>
</div>
</span>
   `,
  styles:[
    `
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
export class toggleFunctionality implements ICellRendererAngularComp {
  public params: any;
  closeResult: string;
  DrodownArray;
  P_code_Type;
  filterSearchFlag;
  chekedFlag;
data: any;
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private formBuilder: FormBuilder, private globalServiceService: GlobalServiceService) { }
  agInit(params: any): void {
    this.params = params;
    

    if(this.params.data.status=="Active"){
        this.chekedFlag=true;
      }
      if(this.params.data.status=="Inactive"){
        this.chekedFlag=false;
      }
      this.data = this.params.data.uidpk;
      //console.log(this.data,this.params.data.status,this.chekedFlag);
    }
  

  ngOnInit() {
    
  }

  refresh(): boolean {
    return false;
  }
  ActivateDeactivate(){
    
    if(this.params.data.status=="Active"){
        this.params.data.status="InActive"
    }else{
        this.params.data.status="Active";
    }

    this.globalServiceService.toggleStatus(this.params.data.uidpk,this.params.data.productDispName, this.params.data.productDescription, this.params.data.sku, this.params.data.productStartDate, this.params.data.productExpDate, this.params.data.productType,this.params.data.status).subscribe(
      result => {
        let msg;
        msg=result;
        if(msg.message=="User deactivated successfully!!"){
          this.chekedFlag=true;
        }
        if(msg.message=="User deactivated successfully!!"){
          this.chekedFlag=false;
        }
        //console.log(result);
      }
     );
  }
}
