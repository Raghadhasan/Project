import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router:Router){}
registerForm:FormGroup = new FormGroup({
  fullName : new FormControl('Your Name' , [Validators.required]),
  email :new FormControl('ex@example.com',[Validators.required,Validators.email]), 
  password:new FormControl('********', [Validators.required,Validators.minLength(8)]),
  reapatPassword: new FormControl('********')
})


submit(){
  console.log(this.registerForm.value)

}
matchError(){
  if(this.registerForm.controls['password'].value ==
    this.registerForm.controls['reapatPassword'].value )
    this.registerForm.controls['reapatPassword'].setErrors(null)
    else 
    this.registerForm.controls['reapatPassword'].setErrors({misMatch:true})
}

goToLogin(){
this.router.navigate(['security/login']); 
}
}
