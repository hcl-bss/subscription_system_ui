import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, observable } from 'rxjs';

@Injectable()

export class AuthGuard implements CanActivate{
 // sessionStorage.setItem('X-Auth-Token',succ.headers.get('X-Auth-Token'));          
 // this.token=sessionStorage.getItem('X-Auth-Token');   

  constructor( private routes : Router){}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(sessionStorage.getItem('X-Auth-Token')!= null){
        return true;
      }
      else{
        this.routes.navigate(['/login']);
        return false;
      }
    }

}





// @Injectable({
//   providedIn: 'root'
// })

// export class AuthGuard implements  {
  
// }
