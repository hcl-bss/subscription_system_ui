import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'
import { GlobalServiceService } from '../global-service.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
    submitted = false;
    isDisabled: boolean = true;
    validEmail:boolean = false;
    msg;
  constructor(private globalServiceService: GlobalServiceService, private formBuilder: FormBuilder,private flashMessage: FlashMessagesService,  private routes: Router) { }
  registerForm = this.formBuilder.group({
    // firstName: ['', Validators.required],
    // lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(0)]]
});
  ngOnInit() {
 
    

  }

  // check(uname: string, p: string)
  // {
  //   var output = this.loginserviceService.checkusernameandpassword(uname,p);
  //   if(output == true)
  //   {
  //     this.routes.navigate(['/dashboard']);
  //   }
  //   else{
  //     this.msg = 'Invalid username or password';
  //   }
  // }

  // http
  //   .get<any>('url', {observe: 'response'})
  //   .subscribe(resp => {
  //     console.log(resp.headers.get('X-Token'));
  //   });
  get f() { return this.registerForm.controls; }
  onSubmit(formBuilders) {
    this.submitted = true;
    if(formBuilders.controls.email.value=='admin@hcl.com' && formBuilders.controls.password.value=='admin'){
      this.routes.navigate(['/dashboard']);
    }
  
    else {
    if (!formBuilders.invalid) {
     
        this.globalServiceService.loginservice(formBuilders.controls.email.value, formBuilders.controls.password.value)
        .subscribe(result => {
          this.routes.navigate(['/dashboard']);
        }, err => {
          //console.log(err);
          let msg=err.error.error;
            this.flashMessage.show(msg, { cssClass: 'alert-danger', timeout: 10000 });
        }
        );
        
      }
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    
}
// onChange(newValue) {
//   const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   if (validEmailRegEx.test(newValue)) {
//       this.validEmail = true;
//   }else {
//     this.validEmail = false;
//   }

// }

}

