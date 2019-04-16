import { Component, OnInit } from '@angular/core';
import { ContactListComponent } from '../subscription/contact-list.component'
import { GlobalServiceService } from '../global-service.service';

@Component({
  selector: 'app-subscription-detail',
  templateUrl: './subscription-detail.component.html',
  styleUrls: ['./subscription-detail.component.css']
})
export class SubscriptionDetailComponent implements OnInit {
subscription_no;
  email: any;
  c_name: any;
  subscritiondata;
  status;
  billingAddress;
  shippingAddress;
  billingCity;
  billingzipcode;
  billingstate;
  billingLine2;
  billingLine1;
  billinfCountry;
  shippingCity;
  shippingzipcode;
  shippingstate;
  shippingLine2;
  shippingLine1;
  shippingCountry;
  productPlanArr;
  amount;
  total=0;
  nextBillingDate;
  lastBillDate;
  totalAmount;
  renewsForever;
  remainingCycles;
  constructor(private globalServiceService: GlobalServiceService) { }

  ngOnInit() {
    this.subscription_no = this.globalServiceService.subsData;
    this.email = this.globalServiceService.emailsubscription;
    this.c_name = this.globalServiceService.cnamesubscription;
    this.globalServiceService.subscritionDetails().subscribe(
      data => {
      this.subscritiondata=data;
      this.status=this.subscritiondata.subscriptionDto.status;
      this.billingAddress=this.subscritiondata.billingAdress;
      this.billingCity=this.billingAddress.city;
      this.billinfCountry=this.billingAddress.country;
      this.billingLine1=this.billingAddress.line1;
      this.billingLine2=this.billingAddress.line2;
      this.billingstate=this.billingAddress.state;
      this.billingzipcode=this.billingAddress.zipcode;         
      this.shippingAddress=this.subscritiondata.shippingAdress;
      this.shippingCity=this.shippingAddress.city;
      this.shippingzipcode=this.shippingAddress.zipcode;
      this.shippingstate=this.shippingAddress.state;
      this.shippingLine2=this.shippingAddress.line2;
      this.shippingLine1=this.shippingAddress.line1;
      this.shippingCountry=this.shippingAddress.country;
      this.productPlanArr=this.subscritiondata.subscriptionDto.productPlanList;
      this.nextBillingDate=this.subscritiondata.subscriptionDto.nextBillDate;
      this.lastBillDate=this.subscritiondata.subscriptionDto.lastBillDate;
      if(this.lastBillDate==null){
        this.lastBillDate="N/A"
      }
      this.totalAmount=this.subscritiondata.subscriptionDto.totalAmount;
      this.renewsForever=this.subscritiondata.subscriptionDto.renewsForever;
      this.remainingCycles=this.subscritiondata.subscriptionDto.remainingCycles;
     for(let i=0;i<this.productPlanArr.length;i++){
        this.amount=this.productPlanArr[i].quantity * this.productPlanArr[i].rate;
        this.total+=this.amount;
     }
      },
      error => {
      console.log("************",error);
      }

    )

  }

}
