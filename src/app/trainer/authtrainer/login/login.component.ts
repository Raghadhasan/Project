import { Component } from '@angular/core';
import { MentorService } from '../../services/mentor.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emali: any;
  password: any;
  email: any;
  constructor(public mentor: MentorService) {
    mentor.message = 'Login component';

    this.email = new FormControl('', [Validators.required, Validators.email]);
    const passwordd = new FormControl('', [Validators.required, Validators.minLength(8)]);

  }
}