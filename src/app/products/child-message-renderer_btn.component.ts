import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'child-cell',
  template: `<span><i (click)="open(editProduct)" class="fa fa-pencil-square-o fa-2" aria-hidden="true" style="cursor:pointer;"></i></span>
  <!-- <span style="float:left;margin-right: 3px;margin-top: 4px;">
    <div class="onoffswitch">
      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="{{params.data.userProfile}}" (change)="FieldsChange($event)">
      <label class="onoffswitch-label" for="{{params.data.userProfile}}" (click)="ActivateDeactivate(params.data.userId)">
          <span class="onoffswitch-inner"></span>
          <span class="onoffswitch-switch"></span>
      </label>
    </div>
  </span>-->
  <ng-template #editProduct let-modal>

        <div class="modal-header">

          <h4 class="modal-title" id="modal-basic-title">Edit Product</h4>

          <button type="button" class="close" aria-label="Close" (click)="modal.dismiss('Cross click')"  >

            <span aria-hidden="true">&times;</span>

          </button>

        </div>


        <flash-messages></flash-messages>
        <div class="modal-body" style="width:100%">
          <form>
           <div class="col-lg-12">
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="name"> Name:</label>
                  <span  *ngIf="!filterSearchFlag">
                  <input type="text" class="form-control"  placeholder={{params.data.productDispName}} name="nameEditProd" [(ngModel)]="nameEditProd">
                </span>
      
                <span  *ngIf="filterSearchFlag">
                <input type="text" class="form-control" disabled placeholder={{params.data.productDispName}} name="nameEditProd" [(ngModel)]="nameEditProd">
                </span>
                 
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="description">Description:</label>
                  <input type="text" class="form-control" placeholder={{params.data.productDescription}} name="descriptionEditProd" [(ngModel)]="descriptionEditProd">
              </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="sku">SKU:</label>


                  <span  *ngIf="!filterSearchFlag">
                  <input type="text" class="form-control" placeholder={{params.data.sku}}  name="skuEditProd" [(ngModel)]="skuEditProd">
                </span>
      
                <span  *ngIf="filterSearchFlag">
                <input type="text" class="form-control" disabled placeholder={{params.data.sku}}  name="skuEditProd" [(ngModel)]="skuEditProd">
                </span>

                  
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="startdate">Start Date:</label>
                  
                  <span  *ngIf="!filterSearchFlag">
                  <div class="input-group">
                  <input id="startDateId"  readonly class="form-control" placeholder={{params.data.productStartDate}} name="startDateEditProd" [(ngModel)]="startDateEditProd" ngbDatepicker
                    (click)="startDateEdit.toggle()" #startDateEdit="ngbDatepicker">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary calendar" (click)="startDateEdit.toggle()" type="button">
                      <i class="fa fa-calendar fa-2" aria-hidden="true"></i>
                    </button>
                  </div>
                  
</div>
                </span>
      
                <span  *ngIf="filterSearchFlag">
                <div class="input-group">
                <input id="startDateId" disabled readonly class="form-control" placeholder={{params.data.productStartDate}} name="startDateEditProd" [(ngModel)]="startDateEditProd" ngbDatepicker
                  (click)="startDateEdit.toggle()" #startDateEdit="ngbDatepicker">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary calendar" (click)="startDateEdit.toggle()" type="button">
                    <i class="fa fa-calendar fa-2" aria-hidden="true"></i>
                  </button>
                </div>
                
</div>
                </span>
                 
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="enddate"> End Date:</label>
                  <span  *ngIf="!filterSearchFlag">
                  <div class="input-group">
                  <input id="endDateId" readonly class="form-control" placeholder={{params.data.productExpDate}} name="endDateEditProd" [(ngModel)]="endDateEditProd" ngbDatepicker
                    (click)="endDateEdit.toggle()" #endDateEdit="ngbDatepicker">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary calendar" (click)="endDateEdit.toggle()" type="button">
                      <i class="fa fa-calendar fa-2" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                </span>
      
                <span  *ngIf="filterSearchFlag">
                <div class="input-group">
                <input id="endDateId" disabled readonly class="form-control" placeholder={{params.data.productExpDate}} name="endDateEditProd" [(ngModel)]="endDateEditProd" ngbDatepicker
                  (click)="endDateEdit.toggle()" #endDateEdit="ngbDatepicker">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary calendar" (click)="endDateEdit.toggle()" type="button">
                    <i class="fa fa-calendar fa-2" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
                </span>
                
                </div>
              </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="producttype"> Product Type:</label>
                      <span  *ngIf="!filterSearchFlag">
                      <select class="form-control" id="sel1"  name="producttypeEditProd" [(ngModel)]="producttypeEditProd" (change)="dropDown(producttypeEditProd)">
                      <option [ngValue]="Select" hidden>{{params.data.productTypeCode}}</option>
                      <option *ngFor="let values of DrodownArray">{{values.productType}}</option>
                    </select>
                    </span>
          
                    <span  *ngIf="filterSearchFlag">
                    <select disabled class="form-control" id="sel1"  name="producttypeEditProd" [(ngModel)]="producttypeEditProd" (change)="dropDown(producttypeEditProd)">
                    <option [ngValue]="Select" hidden>{{params.data.productTypeCode}}</option>
                    <option *ngFor="let values of DrodownArray">{{values.productType}}</option>
                    </select>
                    </span>
                   
                    </div>
                  </div>
            </div>
          </div>
          </form>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-info" (click)="editProductData(endDateEditProd,startDateEditProd,skuEditProd,descriptionEditProd,nameEditProd)">Save </button>
        <button type="button" class="btn btn-info" (click)="modal.close('Save click')">Close</button>
        </div>
      </ng-template>
   `,
  styles: [`    
    .modal-body{width: 100%;}
    
    `
  ]
})
export class ChildMessageRendereredit implements ICellRendererAngularComp {
  public params: any;
  closeResult: string;
  DrodownArray;
  P_code_Type;
  filterSearchFlag;
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private formBuilder: FormBuilder, private globalServiceService: GlobalServiceService) { }
  agInit(params: any): void {
    this.params = params;
    this.filterSearchFlag = this.params.data.transactionFlag;

  }

  ngOnInit() {
    this.globalServiceService.fetchdropdownvalues().subscribe(data => {
      this.DrodownArray = data;
      //  console.log(this.DrodownArray);
    });

  }
  FieldsChange(values: any) {

    //  console.log(values.currentTarget.checked);
  }
  refresh(): boolean {
    return false;
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
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with:
${reason}`;
    }
  }
  dropDown(producttype) {
    for (let i = 0; i < this.DrodownArray.length; i++) {
      if (this.DrodownArray[i].productType == producttype) {
        this.P_code_Type = this.DrodownArray[i].productTypeCode;
      }
    }
  }
  editProductData(endDateEditProd, startDateEditProd, skuEditProd, descriptionEditProd, nameEditProd) {
    if (endDateEditProd == undefined) {
      endDateEditProd = this.params.data.productExpDate;
    }
    if (startDateEditProd == undefined) {
      startDateEditProd = this.params.data.productStartDate;
    }
    if (skuEditProd == undefined) {
      skuEditProd = this.params.data.sku;
    }
    if (descriptionEditProd == undefined) {
      descriptionEditProd = this.params.data.productDescription;
    }
    if (nameEditProd == undefined) {
      nameEditProd = this.params.data.productDispName;
    }
    if (this.P_code_Type == undefined) {
      for (let i = 0; i < this.DrodownArray.length; i++) {
        if (this.DrodownArray[i].productType == this.params.data.productTypeCode) {
          this.P_code_Type = this.DrodownArray[i].productTypeCode;
        }
      }
    }
    this.globalServiceService.editProduct(this.params.data.uidpk, nameEditProd, descriptionEditProd, skuEditProd, startDateEditProd, endDateEditProd, this.P_code_Type).subscribe(
      result => {
        let msg;
        msg=result;
        this.flashMessage.show(msg.message, { cssClass: 'alert-success', timeout: 5000 });
      },
      error => {
        console.log(error.error.message);
        this.flashMessage.show(error.error.message, { cssClass: 'alert-danger', timeout: 5000 });
      }
    )
  }
}