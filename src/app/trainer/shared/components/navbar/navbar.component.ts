import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  showdropdown: boolean = false;
   showProfile: boolean = false; // للتحكم في عرض نموذج "My Profile"
  profileData = {
    name: 'Kevin Anderson',
    email: 'kevin@example.com',
    position: 'Web Designer',
    phone: '123-456-7890'
  };

  sidebarToggle(){
    // this.menustatus=!this.menustatus;
    // this.sidebarToggled.emit(this.menustatus);
  }
  dropdown() {
    if (this.showdropdown == false) {
      this.showdropdown = true;

    }
    else {
      this.showdropdown = false;
    }
  }
  logout() {
    console.log("logout")
  }

  
}
