import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalServiceService } from '../global-service.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'child-cell',
  template: `<span><button style="height: 20px; line-height: 0.5" (click)="open(editProduct)" class="btn btn-info">Edit</button></span>
  
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
                  <input type="text" class="form-control" placeholder={{params.data.productDispName}} name="nameEditProd" [(ngModel)]="nameEditProd">
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
                  <input type="text" class="form-control" placeholder={{params.data.sku}}  name="skuEditProd" [(ngModel)]="skuEditProd">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="startdate">Start Date:</label>
                  <div class="input-group">
                    <input id="startDateId" readonly class="form-control" placeholder={{params.data.productStartDate}} name="startDateEditProd" [(ngModel)]="startDateEditProd" ngbDatepicker
                      (click)="startDateEdit.toggle()" #startDateEdit="ngbDatepicker">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary calendar" (click)="startDateEdit.toggle()" type="button">
                        <i class="fa fa-calendar fa-2" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="form-group">
                  <label for="enddate"> End Date:</label>
                  <div class="input-group">
                    <input id="endDateId" readonly class="form-control" placeholder={{params.data.productExpDate}} name="endDateEditProd" [(ngModel)]="endDateEditProd" ngbDatepicker
                      (click)="endDateEdit.toggle()" #endDateEdit="ngbDatepicker">
                    <div class="input-group-append">
                      <button class="btn btn-outline-secondary calendar" (click)="endDateEdit.toggle()" type="button">
                        <i class="fa fa-calendar fa-2" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label for="producttype"> Product Type:</label>
                      <select class="form-control" id="sel1"  name="producttypeEditProd" [(ngModel)]="producttypeEditProd" (change)="dropDown(producttypeEditProd)">
                        <option [ngValue]="Select" hidden>{{params.data.productTypeCode}}</option>
                        <option *ngFor="let values of DrodownArray">{{values.productType}}</option>
                      </select>
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
  constructor(private modalService: NgbModal, private flashMessage: FlashMessagesService, private formBuilder: FormBuilder, private globalServiceService: GlobalServiceService) { }
  agInit(params: any): void {
    this.params = params;
  }

  ngOnInit() {
    this.globalServiceService.fetchdropdownvalues().subscribe(data => {
      this.DrodownArray = data;
      console.log(this.DrodownArray);
    });
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
    this.globalServiceService.editProduct(this.params.data.uidpk,nameEditProd,descriptionEditProd,skuEditProd,startDateEditProd,endDateEditProd,this.P_code_Type).subscribe(
      result=>{
      
      },
      error=>{

      }
    )
  }
}