import { Component, OnInit } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { GlobalServiceService } from "../global-service.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Key } from "selenium-webdriver";

@Component({
  selector: "app-userprofile",
  templateUrl: "./userprofile.component.html",
  styleUrls: ["./userprofile.component.css"]
})
export class UserprofileComponent implements OnInit {
  userrole = [];
  userRoleArray = [];
  checkFlag: boolean;
  x: any;
  role;
  dataArray: any;
  mainmenu = [];
  submenu = [];
  dropdownData: any;
  userProfiles: any;
  Data: any;
  roleName: string;
  menuSubmenuData: any;
  subMenuList=[];
  description: string;

  private gridApi;
  private gridColumnApi;

  private columnDefs;
  private rowSelection;
  private rowData;

  // private gridApi;
  //private gridColumnApi;
  private columnDefsMultiple;
  private rowSelectionMultiple;
  private rowDataMultiple;
  listItems = false;
  listSubmenuItems = false;
  menuList=[]
  selectedMainMenu;
  selectedSubMenu;
  mappedData;
  mappingMenuSubmenu=[]
  items: string;
selectedList=[];
  constructor(
    private router: Router,
    private http: HttpClient,
    private flashMessage: FlashMessagesService,
    private globalServiceService: GlobalServiceService
  ) {
    this.columnDefs = [
      {
        headerName: "Main Menu",
        field: "menuName",
        width: 233
      }
    ];
    this.rowSelection = "single";

    this.columnDefsMultiple = [
      {
        headerName: "Sub Menu",
        field: "subMenuList",
        width: 233
      }
    ];
    this.rowSelectionMultiple = "multiple";
  }

  ngOnInit() {


    //(document.getElementById("createProfilebtn") as HTMLInputElement).disabled = true;

    this.globalServiceService.menuSubmenuList("").subscribe(data => {
      this.menuSubmenuData = data;
      this.menuSubmenuData = this.menuSubmenuData.unmappedMenuMap;

      var keys = [];
      for (var k in this.menuSubmenuData) keys.push(k);
      this.rowData = keys;
      this.rowData = this.rowData.map(function(item) {
        return { menuName: item };
      });
    });
  }

  mappedValues(roleName) {
   
    if(roleName==undefined || roleName==""){
      this.flashMessage.show("Please enter Role Name", {
        cssClass: "alert-danger",
        timeout: 5000
      });
    }else{
      
    const result=Array.from(new Set(this.mappingMenuSubmenu.map(s=>s.menuName)))
    .map(menuName=>{
      return {
      menuName:menuName,
      subMenuList:this.mappingMenuSubmenu.find(s=>s.menuName===menuName).subMenuList
    };
    });

    this.globalServiceService.createNewProfile(this.description,result,roleName).subscribe(
     result=>{
       let msg;
       msg=result;
      this.flashMessage.show(msg.message, {
                    cssClass: "alert-success",
                    timeout: 5000
                  });
                  this.listSubmenuItems=false;
                  this.ngOnInit();
                  this.roleName="";
     },
     error=>{
       let msg;
       msg=error;
      //console.log(error);
      this.flashMessage.show(msg.error.error, {
                    cssClass: "alert-danger",
                    timeout: 5000
                  });
                  this.listSubmenuItems=false;
                  this.ngOnInit();
                  this.roleName="";
     }
   )
    }
  

  }
  check:any;
 d :any={};
 q:any[];
  //getting sub menu
  onRowClicked(event: any) {
    this.check=event.data.menuName;
if(!this.d.hasOwnProperty(event.data.menuName))
  {
     this.d[event.data.menuName]=[];
  }
   
    this.selectedMainMenu=event.data.menuName;
    this.rowDataMultiple = [];
    this.rowDataMultiple.push(this.menuSubmenuData[event.data.menuName]);
    this.rowDataMultiple = this.rowDataMultiple[0].map(function(item) {
      return { subMenuList: item };
    });
    if (this.rowDataMultiple.length > 0) {
      this.listSubmenuItems = true; 
    } else {
      this.listSubmenuItems = false;
    }
  
   
const resultnew=Array.from(new Set(this.mappingMenuSubmenu.map(s=>s.menuName)))
.map(menuName=>{
  return {
  menuName:menuName,
  subMenuList:this.mappingMenuSubmenu.find(s=>s.menuName===menuName).subMenuList
};
});
//console.log("&&&&&&&&",resultnew);
for(let i=0;i<resultnew.length;i++){
  for(let j=0;j<resultnew[i].subMenuList.length;j++){
   // console.log(resultnew[i].subMenuList[j]);
    this.gridApi.forEachNode((node) => {   
      if (node.data.subMenuList == resultnew[i].subMenuList[j]) {
        node.setSelected(true);        
      }          
    }); 
  }
}

  }
  onRowClickedSubmenu(event: any) {
  if(!this.d[this.check].includes(event.data.subMenuList))
  {
     this.d[this.check].push(event.data.subMenuList);
  }
  else
  {
   var index= this.d[this.check].indexOf(event.data.subMenuList)
   if(index>-1)
   {
    this.d[this.check].splice(index,1);
   }

  }
  localStorage.setItem('items',JSON.stringify(this.d));
  //console.log(this.d);
    this.selectedSubMenu=[];
    this.mappedData="";

    this.gridApi.forEachNode((node) => {   
        if (node.selected == true) {
          this.selectedSubMenu.push(node.data.subMenuList);         
        }          
    });   
    if(this.selectedSubMenu.length>0){
      (document.getElementById("createProfilebtn") as HTMLInputElement).disabled = false;
      this.mappedData={
              "menuName": this.selectedMainMenu,
              "subMenuList":this.selectedSubMenu
            }    
    }
    this.mappingMenuSubmenu.unshift(this.mappedData);
    
  }

  onSelectionChanged(event) {
    // //console.log(event);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onGridReadyMultiple(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
       
  }

  isValid(): boolean {
    if (this.router.url != "/userprofile/userUpdate") {
      return true;
    }

    return false;
  }
}

