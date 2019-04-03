import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalPropertiesService {

  constructor() { }


  propertyValues=[

  {
    "sdate":"Start Date:",
  }
  ]

  getPropertyValues(){
    return this.propertyValues;
  }
}
