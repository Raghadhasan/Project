import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/trainer/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit  {
  id: any;
  profile: any;
  profileForm!: FormGroup;
  countries: string[] = ['Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Bahrain', 'Oman', 'Jordan', 'Morocco', 'Algeria', 'Tunisia'];
  imageUrl: string | ArrayBuffer | null | undefined = null;
  selectedImageName: string | undefined = undefined;
  selectedFile: File | null = null;
  constructor(
    private service: ProfileService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let User_Id = localStorage.getItem('User_Id');

    this.service.getUser(User_Id).subscribe(res => {
      this.profile = res;
      this.profileForm = this.formBuilder.group({
        userName: [res.username, Validators.required],
        userEmail: [res.useremail, [Validators.required, Validators.email]],
        userImage: [res.userimage],
        country: [res.country],
        gender: [res.gender],
        phone: [res.phone, Validators.required],
        address: [res.addres],
        passwordd: [res.passwordd]

      });
      this.selectedImageName = res.userimage;

    });

  }
  passwordVisible = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedImageName = file.name;
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(file);


    }
  }
  getProfileImage(): string {
    return `assets/trainer/Images/${this.profileForm.value.userImage || 'default-image.jpg'}`;
  }

  onSubmit() {
    let imageName = this.imageUrl ? this.selectedImageName : this.profile.userimage;
    let User_Id = localStorage.getItem('User_Id');

    const userData = {
      userid: User_Id,
      userName: this.profileForm.value.userName,
      userEmail: this.profileForm.value.userEmail,
      country: this.profileForm.value.country,
      gender: this.profileForm.value.gender,
      addres: this.profileForm.value.address,
      phone: this.profileForm.value.phone,
      passwordd: this.profileForm.value.passwordd,

      userImage: imageName
    };

    this.service.updateUser(userData).subscribe(
      response => {
        this.service.uploadImage(this.selectedFile!).subscribe(
          (response) => {
          }
        );

      },
      error => {
        console.error('Error updating user:', error);
      }
    );
  }
}
