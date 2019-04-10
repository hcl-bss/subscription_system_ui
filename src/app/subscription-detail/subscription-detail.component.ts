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
  constructor(private globalServiceService: GlobalServiceService) { }

  ngOnInit() {
   this.subscription_no=this.globalServiceService.subsData;
   this.email=this.globalServiceService.emailsubscription;
   this.c_name=this.globalServiceService.cnamesubscription;
  }

}
