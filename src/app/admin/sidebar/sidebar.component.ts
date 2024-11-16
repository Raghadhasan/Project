import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private router: Router,
  ) { }
  logout() {
    // Clear user authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('User_Id');
    
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  
}
