import { Component, OnInit } from "@angular/core";

import { GlobalServiceService } from "../global-service.service";

import { FlashMessagesService } from "angular2-flash-messages";

import { ChildMessageRenderer } from "../child-message-renderer.component";

import { ModalsService } from "../modal.service";
import { NgbModal, ModalDismissReasons,NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { Ng4LoadingSpinnerService } from "ng4-loading-spinner";

import {
  NgbDatepickerConfig,
  NgbDateParserFormatter
} from "@ng-bootstrap/ng-bootstrap";

import { NgbDateFRParserFormatter } from "../ngb-date-fr-parser-formatter";
import { ChildMessageRendereredit } from "./child-message-renderer_btn.component";
import { toggleFunctionality } from "./toggleFunctionality";
@Component({
  selector: "app-product",

  templateUrl: "./product.component.html",

  styleUrls: ["./product.component.css"],

  providers: [
    {
      provide: NgbDateParserFormatter,
      useClass: NgbDateFRParserFormatter
    }
  ]
})
export class ProductComponent implements OnInit {
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
  totalPages;
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
  page = 0;
  filterPage = 0;
  sDate;
  eDate;
  filterSearchFlag = false;
  DrodownArraystatus: any;
  nameMain: string;
  skuMain: string;
  status_valMain: string;
  startDateMain: string;
  endDateMain: string;
  codeMain: string;
  P_code_Typesearch: any;
  exportData;
  associatePagedata1;
  associatePagedata2;
  // flagMapping=false;
  // productMainPage: boolean=true;

  constructor(
    private spinnerService: Ng4LoadingSpinnerService,
    private router: Router,
    private modalService: NgbModal,
    private flashMessage: FlashMessagesService,
    private childMessageRenderer: ChildMessageRenderer,
    private globalServiceService: GlobalServiceService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.columnDefs = [
      {
        headerName: "Name",
        field: "productDispName",
        editable: true,unSortIcon: true
      },

      {
        headerName: "Product Type",
        field: "productTypeCode",
        editable: true,unSortIcon: true
      },

      {
        headerName: "Description",
        field: "productDescription",
        editable: true,unSortIcon: true
      },

      {
        headerName: "SKU",
        field: "sku",
        editable: true,unSortIcon: true
      },

      {
        headerName: "Start Date",
        field: "productStartDate",
        editable: true,unSortIcon: true
      },

      {
        headerName: "End Date",
        field: "productExpDate",
        editable: true,unSortIcon: true
      },

      {
        headerName: "Status",
        cellRenderer: "toggleFunctionality",
        field: "status",
        unSortIcon: true
      },

      {
        headerName: "Plans",
        field: "plans",
        editable: true,
        width: 350,unSortIcon: true
      },
      {
        headerName: "Edit",
        cellRenderer: "ChildMessageRendereredit",

        colId: "params",
        width: 150,unSortIcon: true,
        checked: false
      }
    ];

    // this.rowData = this.createRowData();

    this.context = {
      componentParent: this
    };

    this.frameworkComponents = {
      ChildMessageRendereredit: ChildMessageRendereredit,
      toggleFunctionality:toggleFunctionality
    };

    this.rowSelection = "multiple";

    this.rowGroupPanelShow = "always";

    this.pivotPanelShow = "always";

    this.paginationPageSize = 10;

    // this.paginationStartPage = 0;

    this.paginationNumberFormatter = function (params) {
      return "[" + params.value.toLocaleString() + "]";
    };
  }

  ngOnInit() {
    this.globalServiceService.fetchdropdownvalues().subscribe(data => {
      this.DrodownArray = data;

    });

    this.globalServiceService.getStatusdropDown().subscribe(data => {
      this.DrodownArraystatus = data;
      this.DrodownArraystatus = this.DrodownArraystatus.dropDownList
     // console.log(this.DrodownArraystatus);

    });
    this.spinnerService.show();
    this.globalServiceService.getProducts().subscribe(data => {
      this.spinnerService.hide();
      this.associatePagedata1 = data;     
      this.associatePagedata1 = this.associatePagedata1.productList;      
    })
    this.spinnerService.show();
    this.globalServiceService.getPlans().subscribe
      (data => {
        this.spinnerService.hide();
        this. associatePagedata2 = data;     
      });

      
  }

  dropDown(producttype) {
   // console.log(producttype);
    for (let i = 0; i < this.DrodownArray.length; i++) {
      if (this.DrodownArray[i].productType == producttype) {
        this.P_code_Type = this.DrodownArray[i].productTypeCode;
      }
    }
  }
  dropDownsearchProduct(codeMain) {
    for (let i = 0; i < this.DrodownArray.length; i++) {
      if (this.DrodownArray[i].productType == codeMain) {
        this.P_code_Typesearch = this.DrodownArray[i].productTypeCode;
      }
    }
  }

  open(content) {
    this.modalService
      .open(content, {
        ariaLabelledBy: "modal-basic-title"
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  onPageSizeChanged(newPageSize) {
    var inputElement = <HTMLInputElement>document.getElementById("page-size");

    var value = inputElement.value;

    this.gridApi.paginationSetPageSize(Number(value));
  }

  onGridReady(params) {
    this.gridApi = params.api;

    this.gridColumnApi = params.columnApi;

    this.globalServiceService
      .usermanagementCalling(this.page)
      .subscribe(data => {
        this.rowData = data;
        this.totalPages = this.rowData.totalPages;

        if (this.rowData.lastPage == true) {
          (document.getElementById("next") as HTMLInputElement).disabled = true;
        } else {
          (document.getElementById(
            "next"
          ) as HTMLInputElement).disabled = false;
        }
        this.rowData = this.rowData.productList;
        let arr;
        for (let i = 0; i < this.rowData.length; i++) {
          arr = this.rowData[i].ratePlans;
          if (arr.length == 0) {
            this.rowData[i].plans = "-";
          } else {
            let arr1 = [];
            for (let k = 0; k < arr.length; k++) {
              arr1.push(arr[k].name)
              this.rowData[i].plans = arr1;
            }
          }

        }
        params.api.paginationGoToPage(1);
      });

    // this.globalServiceService.getUserData().subscribe(

    // data => {

    // this.rowData = data;

    // params.api.paginationGoToPage(1);

    // });
  }

  onQuickFilterChanged() {
    var inputElement = <HTMLInputElement>document.getElementById("quickFilter");

    this.gridApi.setQuickFilter(inputElement.value);
  }

  exportImport() {
    document.getElementById("exportImportBox").style.display = "block";
  }

  // export to Csv code start

  onBtExport() {
    // var inputElements= <HTMLInputElement>document.getElementById("#fileName");

    var params = {
      fileName: "usermanagement"

      // fileName: inputElements.value,
    };

    this.gridApi.exportDataAsCsv(params);
  }

  isValid(): boolean {
    if (this.router.url != "/product/import") {
      return true;
    }
    return false;
  }
  isValid1(): boolean {
    if (this.router.url != "/product/associateplan") {
      return true;
    }
    return false;
  }
  callall() {
    this.isValid()
    this.isValid1()
  }
  addProductData(name, description, sku, startDate, endDate) {
    if (name == undefined || name == "" || description == undefined || description == "" || sku == undefined || sku == "" || startDate == undefined || startDate == "" || endDate == undefined || endDate == "" || this.P_code_Type == undefined || this.P_code_Type == "") {
      this.flashMessage.show("All fiels are mandatory to add new product!!", {
        cssClass: "alert-danger",
        timeout: 10000
      });
    } else {
      let sDatevalidate = startDate.month + "/" + startDate.day + "/" + startDate.year;
      let eDatevalidate = endDate.month + "/" + endDate.day + "/" + endDate.year;
      let sDate = startDate.day + "/" + startDate.month + "/" + startDate.year;
      let eDate = endDate.day + "/" + endDate.month + "/" + endDate.year;
      let startDateValue = Date.parse(sDatevalidate);
      let endDateValue = Date.parse(eDatevalidate);
      if (name.length > 100) {
        this.flashMessage.show("Name should be less than 100 characters!!", {
          cssClass: "alert-danger",
          timeout: 10000
        });
      } else {
        if (description.length > 100) {
          this.flashMessage.show(
            "description should be less than 100 characters!!",
            {
              cssClass: "alert-danger",
              timeout: 10000
            }
          );
        } else {
          if (sku.length > 20) {
            this.flashMessage.show("sku should be less than 20 characters!!", {
              cssClass: "alert-danger",
              timeout: 10000
            });
          } else if (startDateValue > endDateValue) {
            this.flashMessage.show(
              "Start date should be less than end date!!",
              {
                cssClass: "alert-danger",
                timeout: 10000
              }
            );
          } else {
            this.spinnerService.show();

            this.globalServiceService
              .addProduct(name, description, sku, sDate, eDate, this.P_code_Type)
              .subscribe(
                data => {
                 // console.log(data);

                  this.rowData = [];

                  this.globalServiceService.usermanagementCalling(this.page).subscribe(data => {
                    this.spinnerService.hide();
                    this.rowData = data;
                    if (this.rowData.lastPage == true) {
                      (document.getElementById("next") as HTMLInputElement).disabled = true;
                    } else {
                      (document.getElementById("next") as HTMLInputElement).disabled = false;
                    }
                    this.rowData = this.rowData.productList;
                    let arr;

                    for (let i = 0; i < this.rowData.length; i++) {
                      arr = this.rowData[i].ratePlans;
                      if (arr.length == 0) {
                        this.rowData[i].plans = "-";
                      } else {
                        let arr1 = [];
                        for (let k = 0; k < arr.length; k++) {
                          arr1.push(arr[k].name)
                          this.rowData[i].plans = arr1;
                        }
                      }

                    }
                    this.producttype = "";

                    this.name = "";

                    this.description = "";

                    this.sku = "";

                    this.startDate = "";

                    this.endDate = "";
                  });
                  this.P_code_Type = "";
                  this.flashMessage.show("New Product added successfully!!", {
                    cssClass: "alert-success",
                    timeout: 10000
                  });

                },

                error => {
                  this.spinnerService.hide();
                  this.P_code_Type = "";
                  if (error.error.errorCode == 1062) {
                    let msg = error.error.message;

                    this.flashMessage.show(msg, {
                      cssClass: "alert-danger",
                      timeout: 10000
                    });
                  } else {
                    this.flashMessage.show(error.error.message, {
                      cssClass: "alert-danger",
                      timeout: 10000
                    });
                  }
                }
              );
          }
        }
      }
    }
  }
  resetValues(nameMain, skuMain, status_valMain, startDateMain, endDateMain, codeMain) {
    this.nameMain = "";
    this.skuMain = "";
    this.status_valMain = "";
    this.startDateMain = "";
    this.endDateMain = "";
    this.codeMain = "";
    this.P_code_Type = "";
    this.sDate = "";
    this.eDate = "";
  }
  emptyValues() {
    this.producttype = "";
    this.name = "";
    this.description = "";
    this.sku = "";
    this.startDate = "";
    this.endDate = "";
  }
  previousFuntionality(nameMain, codeMain, skuMain, status_valMain, startDateMain, endDateMain) {
    this.page = this.page - 1;

    if (this.page == 0) {
      (document.getElementById("prev") as HTMLInputElement).disabled = true;
    }
    if (startDateMain != undefined) {
      this.sDate =
        startDateMain.day +
        "/" +
        startDateMain.month +
        "/" +
        startDateMain.year;
    }
    if (endDateMain != undefined) {
      this.eDate =
        endDateMain.day + "/" + endDateMain.month + "/" + endDateMain.year;
    }
    if (this.filterSearchFlag == true) {
      this.filterPage = this.filterPage - 1;
      if (this.filterPage == 0) {
        (document.getElementById("prev") as HTMLInputElement).disabled = true;
      }
      this.globalServiceService
        .productSearch(nameMain, codeMain, skuMain, status_valMain, this.sDate, this.eDate, this.filterPage)
        .subscribe(data => {
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
          this.rowData = this.rowData.productList;
          let arr;

          for (let i = 0; i < this.rowData.length; i++) {
            arr = this.rowData[i].ratePlans;
            if (arr.length == 0) {
              this.rowData[i].plans = "-";
            } else {
              let arr1 = [];
              for (let k = 0; k < arr.length; k++) {
                arr1.push(arr[k].name)
                this.rowData[i].plans = arr1;
              }
            }

          }
        });
    } else {
      this.globalServiceService
        .usermanagementCalling(this.page)
        .subscribe(data => {
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
          this.rowData = this.rowData.productList;
          let arr;

          for (let i = 0; i < this.rowData.length; i++) {
            arr = this.rowData[i].ratePlans;
            if (arr.length == 0) {
              this.rowData[i].plans = "-";
            } else {
              let arr1 = [];
              for (let k = 0; k < arr.length; k++) {
                arr1.push(arr[k].name)
                this.rowData[i].plans = arr1;
              }
            }

          }
        });
    }
  }
  nextFuntionality(nameMain, codeMain, skuMain, status_valMain, startDateMain, endDateMain) {
    (document.getElementById("prev") as HTMLInputElement).disabled = false;
    this.page = this.page + 1;

    if (startDateMain != undefined) {
      this.sDate =
        startDateMain.day +
        "/" +
        startDateMain.month +
        "/" +
        startDateMain.year;
    }
    if (endDateMain != undefined) {
      this.eDate =
        endDateMain.day + "/" + endDateMain.month + "/" + endDateMain.year;
    }
    if (this.filterSearchFlag == true) {
      this.filterPage = this.filterPage + 1;
      this.globalServiceService
        .productSearch(
          nameMain,
          codeMain,
          skuMain,
          status_valMain,
          this.sDate,
          this.eDate,
          this.filterPage
        )
        .subscribe(data => {
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
          this.rowData = this.rowData.productList;
          let arr;
          for (let i = 0; i < this.rowData.length; i++) {
            arr = this.rowData[i].ratePlans;
            if (arr.length == 0) {
              this.rowData[i].plans = "-";
            } else {
              let arr1 = [];
              for (let k = 0; k < arr.length; k++) {
                arr1.push(arr[k].name)
                this.rowData[i].plans = arr1;
              }
            }

          }
        });
    } else {
      this.globalServiceService
        .usermanagementCalling(this.page)
        .subscribe(data => {
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

          this.rowData = this.rowData.productList;
          let arr;
          for (let i = 0; i < this.rowData.length; i++) {
            arr = this.rowData[i].ratePlans;
            if (arr.length == 0) {
              this.rowData[i].plans = "-";
            } else {
              let arr1 = [];
              for (let k = 0; k < arr.length; k++) {
                arr1.push(arr[k].name)
                this.rowData[i].plans = arr1;
              }
            }

          }
        });
    }
  }
  filterSearch(nameMain, skuMain, status_valMain, startDateMain, endDateMain) {
    // let sDate;
    // let eDate;
    // this.filterSearchFlag = true;
    // if((startDateMain != undefined && endDateMain == undefined) || (startDateMain != "" && endDateMain == "")){
    //   sDate = startDateMain.day + "/" + startDateMain.month + "/" + startDateMain.year;
    //   eDate = "31/12/9999";
    // }else if((startDateMain == undefined && endDateMain != undefined) || (startDateMain == "" && endDateMain != "")){
    //   eDate = endDateMain.day + "/" + endDateMain.month + "/" + endDateMain.year;
    //   sDate = "31/1/1990"
    // }

    let sDate;
    let eDate, datearray, newenddate, newestartdate;
    this.filterSearchFlag = true;
    if ((startDateMain != undefined && endDateMain == undefined) || (startDateMain != "" && endDateMain == "")) {

      sDate = startDateMain.day + "/" + startDateMain.month + "/" + startDateMain.year;
      eDate = "31/12/9999";
      datearray = eDate.split("/");
      newenddate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
      newestartdate = startDateMain.month + "/" + startDateMain.day + "/" + startDateMain.year;

    } else if ((startDateMain == undefined && endDateMain != undefined) || (startDateMain == "" && endDateMain != "")) {
      eDate = endDateMain.day + "/" + endDateMain.month + "/" + endDateMain.year;
      sDate = "31/1/1990"
      datearray = sDate.split("/");
      newestartdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
      newenddate = endDateMain.month + "/" + endDateMain.day + "/" + endDateMain.year;
    }else if((startDateMain != undefined  && endDateMain != undefined && startDateMain != "" && endDateMain != "") ){
      sDate = startDateMain.day + "/" + startDateMain.month + "/" + startDateMain.year;
      eDate = endDateMain.day + "/" + endDateMain.month + "/" + endDateMain.year;
      newestartdate = startDateMain.month + "/" + startDateMain.day + "/" + startDateMain.year;
      newenddate = endDateMain.month + "/" + endDateMain.day + "/" + endDateMain.year;
    }
//|| (startDateMain != "" && endDateMain != "")

    let startDateValue = Date.parse(newestartdate);
    let endDateValue = Date.parse(newenddate);

    if (endDateValue < startDateValue) {
      this.flashMessage.show("Start date should be less than End date.", { cssClass: 'alert-danger', timeout: 5000 });
    }
    else {
      this.globalServiceService.productSearch(nameMain, this.P_code_Typesearch, skuMain, status_valMain, sDate, eDate, this.filterPage)
        .subscribe(data => {
          this.rowData = data;
          this.totalPages = this.rowData.totalPages;
          if (this.rowData.lastPage == true) {
            (document.getElementById("next") as HTMLInputElement).disabled = true;
          } else {
            (document.getElementById(
              "next"
            ) as HTMLInputElement).disabled = false;
          }
          this.rowData = this.rowData.productList;
          let arr;
          for (let i = 0; i < this.rowData.length; i++) {
            arr = this.rowData[i].ratePlans;
            if (arr.length == 0) {
              this.rowData[i].plans = "-";
            } else {
              let arr1 = [];
              for (let k = 0; k < arr.length; k++) {
                arr1.push(arr[k].name)
                this.rowData[i].plans = arr1;
              }
            }

          }
          this.P_code_Typesearch = "";
        }, error => {
          this.P_code_Typesearch = "";
        });
    }

  }
  moveToAssociatePlan() {
    this.globalServiceService.associationDetails(this.associatePagedata1,this.associatePagedata2);
    this.router.navigate(['/associateplan']);
  }
  exportToCsv(){
  this.globalServiceService.exportToCsvData('productlandingpage').subscribe(data => {
    this.exportData = data;
    // let url =  this.exportData.url
    // window.location.href = url;

  },
  error=>{
        // let url = error.url
        // window.location.href = url;
  }
  );
}
}
