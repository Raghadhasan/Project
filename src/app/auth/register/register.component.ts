import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {constructor(public home:HomeService,private auth:AuthService ,private router:Router){}

registerForm:FormGroup = new FormGroup({
  u_name : new FormControl('Your Name' , [Validators.required]),
  userimage :new FormControl(), 
  u_email :new FormControl('ex@example.com',[Validators.required,Validators.email]), 
  l_name :new FormControl('enter user name',[Validators.required]), 
  l_password:new FormControl('********', [Validators.required,Validators.minLength(8)]),
  
})

goToLogin(){
  this.router.navigate(['security/login']); 
  }
 
 
  submit(){
    
    this.home.CreateTrainee(this.registerForm.value)
  }
  uploadImage(file:any){

    if(file.length==0) 
      return; 
    let fileToUpload=<File> file[0]; 
    const formData = new FormData(); 
    formData.append('file', fileToUpload, fileToUpload.name); 
    this.home.uploadAttachment(formData); 
  }

//   constructor(private router:Router){}
// registerForm:FormGroup = new FormGroup({
//   fullName : new FormControl('Your Name' , [Validators.required]),
//   email :new FormControl('ex@example.com',[Validators.required,Validators.email]), 
//   password:new FormControl('********', [Validators.required,Validators.minLength(8)]),
//   reapatPassword: new FormControl('********')
// })


// submit(){
//   console.log(this.registerForm.value)

// }
// matchError(){
//   if(this.registerForm.controls['password'].value ==
//     this.registerForm.controls['reapatPassword'].value )
//     this.registerForm.controls['reapatPassword'].setErrors(null)
//     else 
//     this.registerForm.controls['reapatPassword'].setErrors({misMatch:true})
// }

// goToLogin(){
// this.router.navigate(['security/login']); 
// }
}
