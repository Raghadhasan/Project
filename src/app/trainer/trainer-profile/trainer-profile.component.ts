// src/app/trainee-profile/trainee-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TraineeProfile } from '../trainee-profile.model';
import { TraineeProfileService } from '../trainee-profile.service';

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

  constructor(private profileService: TraineeProfileService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    const traineeId = 1; // Replace with the appropriate trainee ID
    this.profileService.getProfile(traineeId).subscribe(
      (data: { id: any; name: any; email: any; phone: any; address: any; }) => {
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
