import { Injectable,EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders,HttpResponse } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalServiceService {
  $isLOggedIn = new EventEmitter();
  plan_list: any;
  p_list: any;
  url = 'http://localhost:8080';
  logindata;
  editdata;
  getUserIdprofile;
  addUserData;
  searchSubcriptionData;
  activeDeactiveDta;
  pwdResetData;
  searchData;
  newProductData;
  subscriptionData;
  searchProductData;
  newPlanData;
  associationPlans: any;
  editProductData: string;
  userData: any;
  subsData: any;
  emailsubscription: any;
  cnamesubscription: any;
  subsciptionDetailsrlno: string;
  graphData;
  token;
  loginResponse;
  roleMenulist: string;
  getPlansLandingData: string;
  loginData;
  newProfile: string;
  deleteProfile: string;
  getProductLandingData: string;
  editRatePlan: string;
  menuMap;
  currentUserData;


    constructor(private http: HttpClient) { 
      this.currentUserData=JSON.parse(sessionStorage.getItem('currentUser'));
      this.token=sessionStorage.getItem('X-Auth-Token');  
      //console.log("inside this.loginData **********",this.currentUserData);
     // console.log("******",this.token);
    }




  // loginservice(username, password) {

  //   this.logindata = JSON.stringify(
  //     {
  //       "userId": username,
  //       "password": password
  //     });

  //   return this.http.post(this.url + '/login', this.logindata, {
  //     observe:'response',
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
        
  //     })
  //   }).pipe(map((response: HttpResponse<any>) => {
  //     console.log(response);
  //     //this.loginResponse= response;
      
  //     return response;
  //   }));
  // }

  loginservice(username, password) {

    this.logindata = JSON.stringify(
      {
        "userId": username,
        "password": password
      });

    return this.http.post(this.url + '/login', this.logindata, {
      observe:'response',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
       // 'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: HttpResponse<any>) => {
     // //console.log(response);
     
       var succ= response;
      sessionStorage.setItem('X-Auth-Token',succ.headers.get('X-Auth-Token'));          
      this.token=sessionStorage.getItem('X-Auth-Token');   

      if (response) {
        sessionStorage.setItem('currentUser', JSON.stringify(response));       
      }
       this.loginData=sessionStorage.getItem('currentUser');
        this.currentUserData=JSON.parse(this.loginData);
       console.log(this.currentUserData);
        console.log(this.token);   

      return response;
    }));
  }
  logout(){
  //
     return this.http.get(this.url + '/logout?sessionID='+this.token, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })      
    }).pipe(map((response: Response) => {
      
      return response;
    }));
 
  }


  //  logout(){
  //  // sessionStorage.removeItem('X-Auth-Token'); 
  //   this.subscriptionData = JSON.stringify({
  //     'sessionID':  this.token
  //    })

  //   return this.http.get(this.url + '/logout?sessionID='+this.token, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'X-Auth-Token':  this.token,
  //     //  'sessionID':  this.token
  //     })
      
  //   }).pipe(map((response: Response) => {
  //     return response;
  //   }));
    
  // }



  sidebar() {
    jQuery(function ($) {
      $(".sidebar-dropdown > a").click(function () {
        $(".sidebar-submenu").slideUp(200);
        if (
          $(this)
            .parent()
            .hasClass("active")
        ) {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .parent()
            .removeClass("active");
        } else {
          $(".sidebar-dropdown").removeClass("active");
          $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
          $(this)
            .parent()
            .addClass("active");
        }
      });

    

      $("#close-sidebar").click(function () {
        $(".page-wrapper").removeClass("toggled");
      });
      $("#show-sidebar").click(function () {
        $(".page-wrapper").addClass("toggled");
      });
    });
    
  }

// sidebard sub menu start
sidebarsubmenu() {
  jQuery(function ($) {
    $(".sidebar-submenu-list > a").click(function () {
     // $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".sidebar-submenu-list").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".sidebar-submenu-list").removeClass("active");
        $(this)
          .next(".sidebar-submenu-list")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

  

    
  });
  
}
//sidebard sub menu end








  jsonCalling() {

    return this.http.get('/assets/dummy.json', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
     // //console.log(response);
      return response;
    }));
  }
// dashboard service call start
  subreport(page) {
      //return this.http.get('/assets/report_sub.json', {
        return this.http.get(this.url + '/batch/lastBatchRunLog/'+page , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
   //  //console.log(response);
      return response;
    }));
  }
//graphperiod start
  graphperiod() {
    return this.http.get(this.url + '/dashboard/getDashboardDropDown?statusId=graphperiod', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
       'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    // //console.log(response);
    return response;
  }));
}
//graphperiod end
//getRevenueData start
//  getRevenueData() {
//     return this.http.get(this.url + '/dashboard/getRevenueData', {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json',
//       'X-Auth-Token':  this.token,
//     })
//   }).pipe(map((response: Response) => {
//     //console.log(response);
//     return response;
//   }));
// }
//getRevenueData end
//graphtype start
graphtype() {
  return this.http.get(this.url + '/dashboard/getDashboardDropDown?statusId=graphtype', {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
     'X-Auth-Token':  this.token,
  })
}).pipe(map((response: Response) => {
 // //console.log(response);
  return response;
}));
}
//graphtype end
//getLastBatchRenewalCount start
getLastBatch() {
  
  return this.http.get(this.url + '/dashboard/getLastBatchRenewalCount', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
     // //console.log(response);
      return response;
    }));
}
//getLastBatchRenewalCount end
//getRevenueData start
getRevenueData() {
  return this.http.get(this.url + '/dashboard/getRevenueData', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
     // //console.log(response);
      return response;
    }));
}
//getRevenueData end
//getValuesForGraph start
dashboardGraph(timePeriod,typeOfGraph){
  this.graphData = JSON.stringify({
  "timePeriod": timePeriod,
  "typeOfGraph": typeOfGraph
  })
  return this.http.post(this.url + '/dashboard/getValuesForGraph', this.graphData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
       'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
   // //console.log(response);
    return response;
  }));
}
//getValuesForGraph end
// dashboard service call end  
executeBatch(batchId) {
      return this.http.get(this.url + '/batch/executeSchedulers?schedulerId='+batchId , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
    //  //console.log(response);
      return response;
    }));
  }


  SubscriptionCalling(page) {
    this.subscriptionData = JSON.stringify({
     "pageNo": page
    })
   // return this.http.get('/assets/Subscription.json', {
    return this.http.put(this.url + '/subscription/subscriptions', this.subscriptionData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
    //  //console.log(response);
      return response;
    }));
  }

  //SubscriptionReportCalling
  SubscriptionreportCalling() {
    this.subscriptionData = JSON.stringify({
      "subscriptionId": "",
      "customerName": "",
      "email": "",
      "planName": "",
      "status": "",
      "price": "",
      "createdDate": "",
      "activatedDate": "",
      "lastBillDate": "",
      "nextBillDate": ""
    })
    return this.http.put(this.url + '/subscription/subscriptions', this.subscriptionData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      return response;
    }));
  }

  //upload case
  uploadExpData(formData) {

    return this.http.post(this.url + '/upload/uploadProductData', formData, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
        'X-Auth-Token':  this.token,

      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }

  
  usermanagementCalling(pageNumber) {

    return this.http.get(this.url + '/product/getProducts/'+pageNumber, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }




  //addProduct 

  addProduct(name, description, sku, startDate, endDate, pCode) {
    this.newProductData = JSON.stringify(
      {


        "productDescription": description,
        "productDispName": name,
        "productExpDate": endDate,
        "productStartDate": startDate,
        "productTypeCode": pCode,
        "sku": sku,



      });

    return this.http.post(this.url + '/product/add', this.newProductData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }
  //edit product
  editProduct(uidpk,name, description, sku, startDate, endDate, pCode){
    if(name==undefined){
      name="";
    }
    if(description==undefined){
      description="";
    }
    if(sku==undefined){
      sku="";
    }
    if(startDate==undefined){
      startDate="";
    }
    if(endDate==undefined){
      endDate="";
    }
    if(pCode==undefined){
      pCode="";
    }
    this.editProductData = JSON.stringify(
      {
        "productDescription": description,
        "productDispName": name,
        "productExpDate": endDate,
        "productStartDate": startDate,
        "productType": pCode,
        "sku": sku,
        "uidpk":uidpk
      });

    return this.http.post(this.url + '/product/updateProduct', this.editProductData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }
  //toggleStatus start
  toggleStatus(uidpk,name, description, sku, startDate, endDate, pCode,status){
    if(name==undefined){
      name="";
    }
    if(description==undefined){
      description="";
    }
    if(sku==undefined){
      sku="";
    }
    if(startDate==undefined){
      startDate="";
    }
    if(endDate==undefined){
      endDate="";
    }
    if(pCode==undefined){
      pCode="";
    }
    this.editProductData = JSON.stringify(
      {
        "productDescription": description,
        "productDispName": name,
        "productExpDate": endDate,
        "productStartDate": startDate,
        "productType": pCode,
        "sku": sku,
        "uidpk":uidpk,
        "status":status,
      });

    return this.http.post(this.url + '/product/updateProduct', this.editProductData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }
  //toggleStatus end
  //search Subcription
  searchSubcription(subscriptionId,customerName,planName,status,fromDateStr,toDateStr,pageno) {
    this.searchSubcriptionData = JSON.stringify(
      {
        "subscriptionId": subscriptionId,
        "customerName": customerName,
        "planName": planName,
        "status": status,
        "fromDateStr": fromDateStr,
        "toDateStr": toDateStr,
        "pageNo": pageno
      });

    return this.http.put(this.url + '/subscription/subscriptions', this.searchSubcriptionData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }

  //add user
  addUser(userId, profile, firstName, middleName, lastName, password) {
    this.addUserData = JSON.stringify(
      {
        "userId": userId,
        "userProfile": profile,
        "userFirstName": firstName,
        "userMiddleName": middleName,
        "userLastName": lastName,
        "attribute": password
      });

    return this.http.post(this.url + '/users/user', this.addUserData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }

  //edit user of usermgmt
  editUser(userId, profile, firstName, middleName, lastName) {
    this.editdata = JSON.stringify(
      {
        "userId": userId,
        "userProfile": profile,
        "userFirstName": firstName,
        "userMiddleName": middleName,
        "userLastName": lastName,
      });

    return this.http.put(this.url + '/users/user', this.editdata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));

  }

  //active-deactive user
  activeDeactive(userId) {
    this.activeDeactiveDta = JSON.stringify(
      {
        "userId": userId
      });

    return this.http.put(this.url + '/users/activate', this.activeDeactiveDta, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }

  //pwd reset user
  resetPwd(userId, newpwd) {
    this.pwdResetData = JSON.stringify(
      {
        "userId": userId,
        "newAttribute": newpwd,
      });

    return this.http.put(this.url + '/users/reset', this.pwdResetData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }

  //All user data
  getUserData(page) {
    this.userData = JSON.stringify(
      {
        "pageNo": page,

      });
    //return this.http.put(this.url + '/users',this.userData, {
      return this.http.put(this.url + '/users/userlist',this.userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }

  //search user data
  searchUserData(user_profile, user_name, first_name, status_val,page) {

    this.searchData = JSON.stringify(
      {
        "userProfile": user_profile,
        "userId": user_name,
        "userFirstName": first_name,
        "status": status_val,
        "pageNo": page

      });

    return this.http.put(this.url + '/users', this.searchData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
     //console.log(response);
      return response;
    }));
  }
  fetchdropdownvalues(){
  
    return this.http.get(this.url + '/product/getProductType', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }
productSearch(nameMain,codeMain,skuMain,status_valMain,startDateMain,endDateMain,filterPage){
  this.searchProductData = JSON.stringify(
    {
       
  "productDispName": nameMain,
  "productExpDate": endDateMain,
  "productStartDate": startDateMain,
  "productTypeCode": codeMain,
  "sku": skuMain,
  "status": status_valMain,
  "pageNo":filterPage
  });
   
  return this.http.post(this.url + '/product/searchProducts', this.searchProductData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}

// report search start
reportSearch(startDateMain,endDateMain,filterPage,status_valMain){
  this.searchProductData = JSON.stringify(
    {
  "startDate": startDateMain,    
  "endDate": endDateMain,
  "status": status_valMain,
  "pageNo":filterPage
    });

    
  return this.http.post(this.url + '/batch/batchRunLog', this.searchProductData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}
//report search end




getProducts() { 
  return this.http.get(this.url + '/product/getProducts/0', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {

    return response;
  }));
}

getPlans(page) {
 this.getPlansLandingData = JSON.stringify(
    {
  "pageNo":page,
    });
  return this.http.post(this.url + '/rate/getRatePlan',this.getPlansLandingData,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {

    return response;
  }));
}

associatePlans(updatePlans, uidpk) {
  //console.log(updatePlans);
  this.associationPlans = JSON.stringify(
    {
      "product": {
        "uidpk": uidpk
      },
      "ratePlan": updatePlans
    });

  return this.http.post(this.url + '/product/associatePlan  ', this.associationPlans, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {

    return response;
  }));
}

//date validation start

dateValidation(startDate, endDate){
  if(startDate!=undefined && endDate!=undefined){
    let sDatevalidate =  startDate.month + "/" + startDate.day + "/" + startDate.year;
    let eDatevalidate =  endDate.month + "/" + endDate.day + "/" + endDate.year;
    
    let startDateValue = Date.parse(sDatevalidate);
    let endDateValue = Date.parse(eDatevalidate);
    
    if (startDateValue > endDateValue){
    return false;
    }else{
    return true;
    }
  }else{
    return true;
  }

}

//date validation end

//get usermgmt status dropdown
getStatusdropDown(){
  return this.http.get(this.url + '/users/getDropDownList?dropDownCode=usrstatus',{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}


fetchCurrencyValues(){
  return this.http.get(this.url + '/rate/getCurrency',{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}

fetchPricingSchemeValues(){
  return this.http.get(this.url + '/rate/getRateplanDropDown?statusId=pricscheme',{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}

fetchBillEveryValues(){
  return this.http.get(this.url + '/rate/getRateplanDropDown?statusId=billfreq',{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
   //console.log(response);
    return response;
  }));
}

fetchUomValues(){
  
    return this.http.get(this.url + '/rate/getUOM', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Auth-Token':  this.token,
      })
    }).pipe(map((response: Response) => {
      //console.log(response);
      return response;
    }));
  }

addPlan(planName, planCode, billEvery, billingTime, pricingSchemePlan, uniqueArray, currencyType, price, radioParam, freeTrial, setupFee, unitOfMeasureId) {


  this.newPlanData = JSON.stringify(
    {
          "name": planName,
          "ratePlanId": planCode,
          "billingCycleTerm": billEvery,
          "billEvery": billingTime,
          "freeTrail": freeTrial,
          "setUpFee": setupFee,
          "pricingScheme": pricingSchemePlan,
          "currencyCode": currencyType,
          "ratePlanVolumeDtoList":uniqueArray,
          "expireAfter": radioParam,
          "type":unitOfMeasureId,
          "price": price,
          "isActive": "INACTIVE"
    }
  );
return this.http.post(this.url + '/rate/ratePlan', this.newPlanData, {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Auth-Token':  this.token,
  })
}).pipe(map((response: Response) => {
  //console.log(response);
  return response;
}));
}

//subscription Detail
subscriptionDetailsData(subsData,email,cname){
  this.subsData=subsData;
  this.emailsubscription=email;
  this.cnamesubscription=cname;
  }

subscritionDetails(){  
  
  return this.http.get(this.url + '/subscription/subscriptionDetail?subscriptionId='+this.subsData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}

//cancel subscription
cancelSubscriptionData(){  

  return this.http.put(this.url + '/subscription/cancelSubscription?subscriptionId='+this.subsData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}

exportToCsvData(pageName){
  return this.http.get(this.url + '/download/downloadRecord?tabName='+pageName,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}
associationDetails(productList,associatedPlan){
this.p_list=productList;
this.plan_list=associatedPlan;
}

//To get the list for menus and submenus for profiles {{User Profile}}
menuSubmenuList(roleName) {

  this.roleMenulist = JSON.stringify(
    {
          "roleName": roleName,          
    }
  );
  return this.http.put(this.url + '/users/profile',this.roleMenulist,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    //console.log(response);
    return response;
  }));
}
// get All User Profiles 
getUserProfiles(){
  
  return this.http.get(this.url + '/users/profile', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    console.log(response);
    return response;
  }));
}

//Delete User Prfile
deleteSelectedProfile(roleName) {
  
  this.deleteProfile = JSON.stringify(
    {
     "roleName": roleName
    }
  );
 
  return this.http.put(this.url + '/user/profile',this.deleteProfile,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    console.log(response);
    return response;
  }));
}

//create user Profile
createNewProfile(description,menuList,roleName) {
  if(description==undefined || description==null){
    description="";
  }
  this.newProfile = JSON.stringify(
    
      {
        "description": description,
        "menuList": menuList,
        "roleName":roleName
      }
          
    
  );
  return this.http.post(this.url + '/user/profile/mapping',this.newProfile,{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Auth-Token':  this.token,
    })
  }).pipe(map((response: Response) => {
    console.log(response);
    return response;
  }));
}

//update plan
updateRatePlan(billEvery,billingCycleTerm,currencyCode,expireAfter,freeTrail,isActive,name,price,pricingScheme,ratePlanId,ratePlanVolumeDtoList,setUpFee,transactionFlag,type,uidpk){
  this.editRatePlan = JSON.stringify(    
    {
      "billEvery": billEvery,
      "billingCycleTerm": billingCycleTerm,
      "currencyCode": currencyCode,
      "expireAfter": expireAfter,
      "freeTrail": freeTrail,
      "isActive": isActive,
      "name": name,
      "price": price,
      "pricingScheme": pricingScheme,
      "ratePlanId": ratePlanId,
      "ratePlanVolumeDtoList":ratePlanVolumeDtoList,
      "setUpFee": setUpFee,
      "transactionFlag": transactionFlag,
      "type": type,
      "uidpk": uidpk
    } 
  
);
return this.http.post(this.url + '/updateRatePlan',this.editRatePlan,{
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Auth-Token':  this.token,
  })
}).pipe(map((response: Response) => {
  console.log(response);
  return response;
}));
}
}
 

 