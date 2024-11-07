import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TraineeService} from "../services/trainee.service";
import {Profile} from "../profile";


class TraineeProfile {
}

@Component({
  selector: 'app-trainee-profile',
  templateUrl: './trainee-profile.component.html',
  styleUrls: ['./trainee-profile.component.css']
})
export class TraineeProfileComponent implements OnInit {
  createProfile: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    address: new FormControl('')
  });

  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private profileService: TraineeService) {
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const traineeId = 1;
    this.profileService.getProfile(traineeId).subscribe(
      (data: Profile) => {
        this.createProfile.setValue({
          id: data.id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address
        });
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching profile:', error);
        this.errorMessage = 'Failed to load the profile. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  updateProfile(): void {
    if (this.createProfile.valid) {
      const updatedProfile: TraineeProfile = this.createProfile.value;
      this.profileService.updateProfile(updatedProfile).subscribe(
        (response: any) => {
          alert('Profile updated successfully!');
          console.log('Profile updated:', response);
        },
        (error: any) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
