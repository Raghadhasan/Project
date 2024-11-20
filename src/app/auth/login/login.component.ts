import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private builder: FormBuilder,
  ) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.builder.group({
      username: this.builder.control('', Validators.required),
      passwordd: this.builder.control('', Validators.required),
    });
  }

  onLogin(loginForm: FormGroup) {
    debugger
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (token: string) => {
          debugger
          try {
            const decodedToken: any = jwtDecode(token);
            localStorage.setItem('authToken', token);
            localStorage.setItem('User_Id', decodedToken.User);

            if (decodedToken.Role === '1') { // admin
              this.router.navigate(['admin/dashboard']).then(() => {
                window.location.reload();
              });
            }
            else if (decodedToken.Role === '2') { // trinaer
              this.router.navigate(['trainer/dashboard']).then(() => {
                window.location.reload();
              });
            }
            else if (decodedToken.Role === '3') { // trinaee
              this.router.navigate(['trainee/dashboard']).then(() => {
                window.location.reload();
              });
            }


          } catch (error) {
            console.error('Error decoding the token:', error);
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
          alert('Username or password is incorrect.');
        }
      });
    } else {
      console.log('Invalid Data');
    }
  }
}


