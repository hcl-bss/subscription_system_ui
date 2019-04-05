import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class GlobalServiceService {

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
  constructor(private http: HttpClient) { }

  loginservice(username, password) {

    this.logindata = JSON.stringify(
      {
        "userId": username,
        "password": password
      });

    return this.http.post(this.url + '/login', this.logindata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }
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
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }

  subreport(page) {
   
    //return this.http.get('/assets/report_sub.json', {
      return this.http.get(this.url + '/lastBatchRunLog/'+page , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }
  
  
executeBatch(batchId) {
   
      return this.http.get(this.url + '/executeSchedulers?schedulerId='+batchId , {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }


  SubscriptionCalling(page) {

    this.subscriptionData = JSON.stringify({
     "pageNo": page
    })
   // return this.http.get('/assets/Subscription.json', {
    return this.http.put(this.url + '/subscriptions', this.subscriptionData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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
    return this.http.put(this.url + '/subscriptions', this.subscriptionData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }

  //upload case
  uploadExpData(formData) {

    return this.http.post(this.url + '/uploadProductData', formData, {
      headers: new HttpHeaders({
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',

      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }

  
  usermanagementCalling(pageNumber) {

    return this.http.get(this.url + '/getProducts/'+pageNumber, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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

    return this.http.post(this.url + '/product', this.newProductData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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

    return this.http.post(this.url + '/updateProduct', this.editProductData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }
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

    return this.http.put(this.url + '/subscriptions', this.searchSubcriptionData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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

    return this.http.post(this.url + '/user', this.addUserData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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

    return this.http.put(this.url + '/user', this.editdata, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));

  }

  //active-deactive user
  activeDeactive(userId) {
    this.activeDeactiveDta = JSON.stringify(
      {
        "userId": userId
      });

    return this.http.put(this.url + '/activate', this.activeDeactiveDta, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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

    return this.http.put(this.url + '/reset', this.pwdResetData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }

  //All user data
  getUserData(page) {
    this.userData = JSON.stringify(
      {
        "pageNo": page,

      });
    return this.http.put(this.url + '/users',this.userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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
      })
    }).pipe(map((response: Response) => {
      console.log(response);
      return response;
    }));
  }
  fetchdropdownvalues(){
  
    return this.http.get(this.url + '/getProductType', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).pipe(map((response: Response) => {
      console.log(response);
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
   
  return this.http.post(this.url + '/searchProducts', this.searchProductData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }).pipe(map((response: Response) => {
    console.log(response);
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

    
  return this.http.post(this.url + '/batchRunLog', this.searchProductData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }).pipe(map((response: Response) => {
    console.log(response);
    return response;
  }));
}
//report search end
//add plan start
addPlan(planName, planCode, billEvery, billingTime, pricingSchemePlan, uniqueArray, currencyType, price, radioParam, billingCyclesInput, freeTrial, setupFee, planDescription) {


  this.newPlanData = JSON.stringify(
    {
          "name": planName,
          "ratePlanId": planCode,
          "billingCycleTerm": billEvery,
          "billEvery": billingTime,
          "pricingScheme": pricingSchemePlan,
          "currencyCode": currencyType,
          "ratePlanVolumeDtoList":uniqueArray,
          "expireAfter": billingCyclesInput,
          "setUpFee": setupFee,
          "freeTrail": freeTrial,
          "type": "DEVICE",// 
          "isActive": "INACTIVE"//

      
               
      // "price": price,
      // "billingCycleTerm": radioParam,
     
     
      
      //"planDescription": planDescription,

    },
    // {
    //         "billingCycleTerm": 2,
    //         "billEvery": "WEEKLY",
    //         "ratePlanId": "TST05",
    //         "name": "TESTING05",
    //         "currencyCode": "USD",            
    //         "pricingScheme": pricingSchemePlan,
    //         "ratePlanVolumeDtoList": [
    //           {
    //             "endQty": 25,
    //             "price": 10.50,
    //             "startQty": 1
    //           },
    //         {
    //             "endQty": 50,
    //             "price": 9.50,
    //             "startQty": 26
    //           },
    //         {
    //             "endQty": 1000,
    //             "price": 9.00,
    //             "startQty": 51
    //           }
    //         ],
    //         "expireAfter": 999,
    //         "setUpFee": 0,
    //         "freeTrail": 0,

      
    // }
  );
 // volumevalue1 = [];

return this.http.post(this.url + '/product', this.newPlanData, {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}).pipe(map((response: Response) => {
  console.log(response);
  return response;

}));


}
//add plan end



getProducts() {

  return this.http.get(this.url + '/getProducts/0', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }).pipe(map((response: Response) => {

    return response;
  }));
}

getPlans() {

  return this.http.get(this.url + '/getRatePlan', {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }).pipe(map((response: Response) => {

    return response;
  }));
}

associatePlans(updatePlans, uidpk) {
  console.log(updatePlans);
  this.associationPlans = JSON.stringify(
    {
      "product": {
        "uidpk": uidpk
      },
      "ratePlan": updatePlans
    });

  return this.http.post(this.url + '/associatePlan', this.associationPlans, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
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
  return this.http.get(this.url + '/getDropDownList?dropDownCode=usrstatus',{
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }).pipe(map((response: Response) => {
    console.log(response);
    return response;
  }));
}

}



