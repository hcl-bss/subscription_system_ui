import {
    Component,
    OnInit
  } from '@angular/core';
  import {
    GlobalServiceService
  } from '../global-service.service';
  import {
    FlashMessagesService
  } from 'angular2-flash-messages';
  import {
    ChildMessageRenderer
  } from "../child-message-renderer.component";
  import {
    ModalsService
  } from '../modal.service';
  import {
    NgbModal,
    ModalDismissReasons
  } from '@ng-bootstrap/ng-bootstrap';
  import {
    Router
  } from '@angular/router';
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
  import {
    FormGroup,
    FormBuilder,
    Validators,
    FormControl,
    FormArray,
    NgForm,
    MaxLengthValidator
  } from '@angular/forms';
  import {
    GlobalPropertiesService
  } from "../global-properties.service";
  import {EditPlanComponent} from './edit_plan_data';
  import { AssociateMappingComponent } from '../associate-mapping.component';
  
  @Component({
    selector: 'app-plan',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.css'],
    providers: [{
        provide: NgbDateParserFormatter,
        useClass: NgbDateFRParserFormatter
    }]
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
    filterPage = 0;
  
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
    price: string;
    pricingSchemePlan: string;
    freeTrial: string;
    setupFee: string;
    dropdownPricingValues: any;
    dropdownBillEveryValues: any;
    dropdownBillValues: any;
    billingInput: any;
    checkInput: boolean;
    radiovalue: string;
    billingCyclesInput: string;
    AR: number;
    planAllData;
    page=0;
      landingData: any;
      billEveryCombined: any;
      totalPages: any;
      DrodownArraystatus: any;
      filterSearchFlag=false;
    constructor(private associateMappingComponent: AssociateMappingComponent,private editPlanComponent:EditPlanComponent,private globalPropertiesService: GlobalPropertiesService, private _fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private router: Router, private modalService: NgbModal, private flashMessage: FlashMessagesService, private childMessageRenderer: ChildMessageRenderer, private globalServiceService: GlobalServiceService) {
        this.AR = 0;
        this.columnDefs = [
          {
              headerName: 'Name',
              field: 'name',
              editable: true
          },
          {
              headerName: 'Plan Code',
              field: 'ratePlanId',
              editable: true
          },
          {
              headerName: 'Bill Every',
              field:  'newEntry',
              editable: true
          },
          {
              headerName: 'Type',
              field: 'pricingScheme',
              editable: true
          },
          {
              headerName: 'Status',
              field: 'isActive',
              editable: true
          },
          {
              headerName: 'Details',
              
              
              cellRenderer: "associateMappingComponent", colId: "params", width: 250 
          },
          {
              headerName: 'Edit',
              cellRenderer: "editPlanComponent", colId: "params", width: 250
          },
  
        ];
        
        this.context = {
            componentParent: this
        };
        this.frameworkComponents = {
            childMessageRenderer: ChildMessageRenderer,
            editPlanComponent: EditPlanComponent,
            associateMappingComponent: AssociateMappingComponent
        };
        
        this.rowSelection = "multiple";
        this.rowGroupPanelShow = "always";
        this.pivotPanelShow = "always";
        this.paginationPageSize = 10;
        this.paginationNumberFormatter = function(params) {
            return "[" + params.value.toLocaleString() + "]";
        };
  
        //volume pop-up data
        this.invoiceForm = this._fb.group({
            itemRows: this._fb.array([this.initItemRows()])
        });
    }
  
    ngOnInit() {
  
        this.fetchValues = this.globalPropertiesService.getPropertyValues();
        this.spinnerService.show();
        this.globalServiceService.fetchdropdownvalues().subscribe(
            data => {
              this.spinnerService.hide();
                this.DrodownArray = data;
            },error=>{
              this.spinnerService.hide();
            });
            this.spinnerService.show();
        this.globalServiceService.fetchUomValues().subscribe(
            data => {
              this.spinnerService.hide();
                this.dropdownUomValues = data;
            },error=>{
              this.spinnerService.hide();
            }
        )
        this.spinnerService.show();
        this.globalServiceService.fetchCurrencyValues().subscribe(
            data => {
              this.spinnerService.hide();
                this.dropdownCurrencyValues = data;
            },error=>{
              this.spinnerService.hide();
            }
        )
        this.spinnerService.show();
        this.globalServiceService.fetchPricingSchemeValues().subscribe(
            data => {
              this.spinnerService.hide();
                this.dropdownPricingSchemeValues = data;
                this.dropdownPricingValues = this.dropdownPricingSchemeValues.dropDownList;
            },error=>{
              this.spinnerService.hide();
            }
        )
        this.spinnerService.show();
        this.globalServiceService.fetchBillEveryValues().subscribe(
            data => {
              this.spinnerService.hide();
                this.dropdownBillEveryValues = data;
                this.dropdownBillValues = this.dropdownBillEveryValues.dropDownList;
            },error=>{
              this.spinnerService.hide();
            }
        )
        this.spinnerService.show();
        this.globalServiceService.getStatusdropDown().subscribe(data => {
          this.spinnerService.hide();
          this.DrodownArraystatus = data;
          this.DrodownArraystatus = this.DrodownArraystatus.dropDownList;
         
    
        },error=>{
          this.spinnerService.hide();
        });
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
        this.modalService.open(content, {
            ariaLabelledBy: 'modal-basic-title'
        }).result.then((result) => {
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
        var inputElement = < HTMLInputElement > document.getElementById("page-size");
        var value = inputElement.value;
        this.gridApi.paginationSetPageSize(Number(value));
    }
  
    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
       
          this.spinnerService.show();
        
        this.globalServiceService.getPlans(this.page).subscribe(
            data => {
              this.spinnerService.hide();
                this.landingData = data;
                this.rowData= this.landingData.ratePlanList;
                this.totalPages = this.landingData.totalPages;
                console.log("***********",this.totalPages);
                if (this.landingData.lastPage == true) {
                  (document.getElementById("next") as HTMLInputElement).disabled = true;
                } else {
                  (document.getElementById("next") as HTMLInputElement).disabled = false;
                }
              for(let i=0;i<this.rowData.length;i++){
                  this.rowData[i].newEntry=this.rowData[i].billingCycleTerm + ' ' + this.rowData[i].billEvery;
                  this.billEveryCombined = this.rowData[i].newEntry;
                  console.log("Bill Every Combined",this.billEveryCombined);    
              }
            },error=>{
              this.spinnerService.hide();
            });
    }
    onQuickFilterChanged() {
        var inputElement = < HTMLInputElement > document.getElementById("quickFilter");
        this.gridApi.setQuickFilter(inputElement.value);
    }
  
    onBtExport() {
        var params = {fileName: "usermanagement"};
        this.gridApi.exportDataAsCsv(params);
    }
  
    isValid(): boolean {
        if (this.router.url != '/product/import') {
            return true;
        }
        return false;
    }
  
    pricingSchemeBox(x) {
        if (x === "VOLUME") {
            this.volumePricingScheme = true;
            (document.getElementById("price_unit") as HTMLInputElement).disabled = true;
        } else {
            this.volumePricingScheme = false;
            (document.getElementById("price_unit") as HTMLInputElement).disabled = false;
        }
    }
  
    radio(radiovalue) {
        if (radiovalue == "9999") {
            this.radioParam = "";
            this.radioParam = 9999;
            this.radioinputbox = false;
  
        } else {
            this.radioParam = "";
            this.radioParam = radiovalue;
            this.radioinputbox = true;
        }
    }
  
    addPlanData(planName, planCode, billEvery, billingTime, unitOfMeasureId, currencyType, price, pricingSchemePlan, freeTrial, setupFee) {
  
        if (billingTime == undefined) {
            billingTime = "WEEK"
        }
  
        if (currencyType == undefined) {
            currencyType = "INR"
        }
  
        if (pricingSchemePlan == undefined) {
            pricingSchemePlan = "UNIT"
        }
  
        if (this.radioParam == undefined) {
            this.radioParam = "9999";
        }
        // if(this.volumePricingScheme == true)
        // if (planName == undefined || planCode == undefined || billEvery == undefined || billingTime == undefined || pricingSchemePlan == undefined || unitOfMeasureId == undefined || currencyType == undefined || price==undefined) {
  
        //   this.flashMessage.show('All fields are mandatory to add new plan!!', {
        //     cssClass: 'alert-danger',
        //     timeout: 5000
        //   });
        // } 
        // else {
        if (pricingSchemePlan == "VOLUME") {
            price = undefined;
            this.volumeArr = this.invoiceForm.value.itemRows;
            if (planName == undefined || planCode == undefined || billEvery == undefined || billingTime == undefined || pricingSchemePlan == undefined || unitOfMeasureId == undefined || currencyType == undefined || this.radioParam == undefined) {
  
                this.flashMessage.show('All * fields are mandatory to add new plan!!', {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
                this.validQty = false;
            } else
            if (this.invoiceForm.value.itemRows[0].startQty == "" || this.invoiceForm.value.itemRows[0].endQty == "" || this.invoiceForm.value.itemRows[0].price == "") {
                this.flashMessage.show('Fill the Start Qty,End Qty and Price!!', {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
                this.validQty = false;
            } else {
                for (let x = 0; x < this.invoiceForm.value.itemRows.length; x++) {
                    if (this.invoiceForm.value.itemRows[x].startQty == "" || this.invoiceForm.value.itemRows[x].endQty == "" || this.invoiceForm.value.itemRows[x].price == "" ||
                        this.invoiceForm.value.itemRows[x].startQty == null || this.invoiceForm.value.itemRows[x].endQty == null || this.invoiceForm.value.itemRows[x].price == null) {
                        this.flashMessage.show('Fill the Start Qty,End Qty and Price!!', {
                            cssClass: 'alert-danger',
                            timeout: 5000
                        });
                        this.validQty = false;
                        break;
                    } else if (this.invoiceForm.value.itemRows[x].startQty >= this.invoiceForm.value.itemRows[x].endQty) {
                        this.flashMessage.show('Starting quantity should be less than ending quantity!!', {
                            cssClass: 'alert-danger',
                            timeout: 5000
                        });
                        this.validQty = false;
                        break;
                    } else {
                        // for(let x=0;x<this.invoiceForm.value.itemRows.length;x++){
                        if (this.invoiceForm.value.itemRows[x + 1] != undefined) {
                            if (this.invoiceForm.value.itemRows[x + 1].startQty == "" || this.invoiceForm.value.itemRows[x + 1].endQty == "" || this.invoiceForm.value.itemRows[x + 1].price == "" ||
                                this.invoiceForm.value.itemRows[x + 1].startQty == null || this.invoiceForm.value.itemRows[x + 1].endQty == null || this.invoiceForm.value.itemRows[x + 1].price == null) {
                                this.flashMessage.show('Fill the Start Qty,End Qty and Price!!', {
                                    cssClass: 'alert-danger',
                                    timeout: 5000
                                });
                                this.validQty = false;
                                break;
                            } else if ((this.invoiceForm.value.itemRows[x].endQty + 1) == this.invoiceForm.value.itemRows[x + 1].startQty) {
                                this.validQty = true;
                            } else {
                                this.flashMessage.show('Enter valid entries!!', {
                                    cssClass: 'alert-danger',
                                    timeout: 5000
                                });
                                this.validQty = false;
                                break;
                            }
                        } else {
                            this.validQty = true;
                        }
                        //   }
                    }
                }
            }
        } else {
            if (planName == undefined || planCode == undefined || billEvery == undefined || billingTime == undefined || pricingSchemePlan == undefined || unitOfMeasureId == undefined || currencyType == undefined || price == undefined || this.radioParam == undefined) {
  
                this.flashMessage.show('All * fields are mandatory to add new plan!!', {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
                this.validQty = false;
            } else {
                this.validQty = true;
            }
  
        }
  
        if (this.validQty == true && this.checkInput == true) {
  
            this.spinnerService.show();
            this.globalServiceService.addPlan(planName, planCode, billEvery, billingTime, pricingSchemePlan, this.volumeArr, currencyType, price, this.radioParam, freeTrial, setupFee, unitOfMeasureId).subscribe(
                data => {
                  this.spinnerService.hide();
                    this.rowData = [];
                    this.volumeArr = [];
  
                    this.flashMessage.show('New Plan added successfully!!', {
                        cssClass: 'alert-success',
                        timeout: 10000
                    });
  
                    this.spinnerService.show();
                    this.globalServiceService.getPlans(this.page).subscribe(
                      data => {
                          this.spinnerService.hide();
                          this.landingData = data;
                          this.rowData= this.landingData.ratePlanList;
                          this.totalPages = this.landingData.totalPages;
                          if (this.landingData.lastPage == true) {
                            (document.getElementById("next") as HTMLInputElement).disabled = true;
                          } else {
                            (document.getElementById("next") as HTMLInputElement).disabled = false;
                          }
                            for(let i=0;i<this.rowData.length;i++){
                            this.rowData[i].newEntry=this.rowData[i].billingCycleTerm + ' ' + this.rowData[i].billEvery;
                            this.billEveryCombined = this.rowData[i].newEntry;
                            console.log("Bill Every Combined",this.billEveryCombined);    
                        }
                      },error=>{
                          this.spinnerService.hide();
                      });
  
                      
                    this.planName = "";
                    this.planCode = "";
                   this.billEvery = "";
                    this.billingTime = "WEEK";
                    this.unitOfMeasureId = "Select";
                    this.currencyType = "INR";
                    this.price = "";
                    this.pricingSchemePlan = "UNIT";
                    this.freeTrial = "";
                    this.setupFee = "";
                    this.radioinputbox = false;
                    this.volumePricingScheme = false;
                    this.radioParam = "";
                    this.radiovalue = "";
                    this.billingCyclesInput = "";
                    this.AR = 0;
                },
                error => {
  
                    this.spinnerService.hide();
  
                });
        } else {
  
        }
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
        this.price = "";
        this.pricingSchemePlan = "UNIT";
        this.freeTrial = "";
        this.setupFee = "";
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
        this.price = "";
        this.pricingSchemePlan = "UNIT";
        this.freeTrial = "";
        this.setupFee = "";
        this.radioinputbox = false;
        this.volumePricingScheme = false;
        this.radioParam = "";
        this.radiovalue = "";
        this.billingCyclesInput = "";
        this.AR = 0;
  
        //this.initItemRows();
    }
  
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
  
    searchPlan(plan_name,plan_code,billEvery,billingTime,plan_status,plan_type){
      this.filterSearchFlag = true;
      this.spinnerService.show();
      this.globalServiceService.planSearch(plan_name,plan_code,billEvery,billingTime,plan_status,plan_type, this.filterPage)
        .subscribe(data => {
          this.spinnerService.hide();
        this.rowData = data;
       
        this.totalPages = this.rowData.totalPages;
        if (this.rowData.lastPage == true) {
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        } else {
          (document.getElementById("next") as HTMLInputElement).disabled = false;
        }
        this.rowData = this.rowData.ratePlanList;
        for(let i=0;i<this.rowData.length;i++){
          this.rowData[i].newEntry=this.rowData[i].billingCycleTerm + ' ' + this.rowData[i].billEvery;
          this.billEveryCombined = this.rowData[i].newEntry;   
      }
  
    },error=>{    
      this.spinnerService.hide();
      this.rowData=[];
     
    });
  }
  
  nextFuntionality(plan_name,plan_code,billEvery,billingTime,plan_status,plan_type) {
      (document.getElementById("prev") as HTMLInputElement).disabled = false;
      this.page = this.page + 1;
  
      if (this.filterSearchFlag == true) {
        this.filterPage = this.filterPage + 1;
        this.spinnerService.show();
        this.globalServiceService.planSearch(plan_name,plan_code,billEvery,billingTime,plan_status,plan_type,this.filterPage)
          .subscribe(data => {
              this.spinnerService.hide();
            this.rowData = data;
            this.totalPages = this.rowData.totalPages;
            if (this.rowData.lastPage == true) {
              (document.getElementById(
                "next"
              ) as HTMLInputElement).disabled = true;
            } else {
              (document.getElementById(
                "next"
              ) as HTMLInputElement).disabled = false;
            }
            this.rowData = this.rowData.ratePlanList;
            for(let i=0;i<this.rowData.length;i++){
              this.rowData[i].newEntry=this.rowData[i].billingCycleTerm + ' ' + this.rowData[i].billEvery;
              this.billEveryCombined = this.rowData[i].newEntry;   
          }
          });
      } else {
          this.page = this.page + 1;
          this.spinnerService.show();
          this.globalServiceService.getPlans(this.page).subscribe(
          data => {
              this.spinnerService.hide();
            this.rowData = data;
            this.totalPages = this.rowData.totalPages;
            if (this.rowData.lastPage == true) {
              (document.getElementById(
                "next"
              ) as HTMLInputElement).disabled = true;
            } else {
              (document.getElementById(
                "next"
              ) as HTMLInputElement).disabled = false;
            }
  
            this.rowData = this.rowData.ratePlanList;
            for(let i=0;i<this.rowData.length;i++){
              this.rowData[i].newEntry=this.rowData[i].billingCycleTerm + ' ' + this.rowData[i].billEvery;
              this.billEveryCombined = this.rowData[i].newEntry;   
          }
       
          });
      }
    }
  
  previousFuntionality(plan_name,plan_code,billEvery,billingTime,plan_status,plan_type){
      this.page = this.page - 1;
  
      if (this.page == 0) {
        (document.getElementById("prev") as HTMLInputElement).disabled = true;
      }
      if (this.filterSearchFlag == true) {
          this.filterPage = this.filterPage - 1;
        if (this.filterPage == 0) {
            (document.getElementById("prev") as HTMLInputElement).disabled = true;
          }
          this.spinnerService.show();
          this.globalServiceService.planSearch(plan_name,plan_code,billEvery,billingTime,plan_status,plan_type,this.filterPage)
          .subscribe(data => {
              this.spinnerService.hide();
            this.rowData = data;
            this.totalPages = this.rowData.totalPages;
            if (this.rowData.lastPage == true) {
              (document.getElementById("next") as HTMLInputElement).disabled = true;
            } else {
              (document.getElementById("next") as HTMLInputElement).disabled = false;
            }
            this.rowData = this.rowData.ratePlanList;
            for(let i=0;i<this.rowData.length;i++){
              this.rowData[i].newEntry=this.rowData[i].billingCycleTerm + ' ' + this.rowData[i].billEvery;
              this.billEveryCombined = this.rowData[i].newEntry;   
          }
  });
      }else{ 
          this.spinnerService.show();
              this.globalServiceService.getPlans(this.page).subscribe(
              data => {
                  this.spinnerService.hide();
                  this.landingData = data;
                  this.rowData= this.landingData;
                  this.totalPages = this.landingData.totalPages;
                  if (this.landingData.lastPage == true) {
                    (document.getElementById("next") as HTMLInputElement).disabled = true;
                  } else {
                    (document.getElementById("next") as HTMLInputElement).disabled = false;
                  }
                  this.rowData=this.rowData.ratePlanList;
                for(let i=0;i<this.rowData.length;i++){
                    this.rowData[i].newEntry=this.rowData[i].billingCycleTerm + ' ' + this.rowData[i].billEvery;
                    this.billEveryCombined = this.rowData[i].newEntry;
                    console.log("Bill Every Combined",this.billEveryCombined);    
                }
              });
      }
  }
}
  