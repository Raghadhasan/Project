import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    bio: 'Passionate developer with a love for Angular and TypeScript.'
  };

  onChangePicture() {
    // Handle the picture change logic here
    alert('Change picture functionality will go here.');
  }

  onSubmit() {
    // Handle the form submission logic here
    console.log('Profile data saved:', this.profile);
    alert('Profile updated successfully!');
  }
}
