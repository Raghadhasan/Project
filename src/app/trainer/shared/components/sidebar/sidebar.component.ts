import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(
    private router: Router,
  ) { }
  isDropdownOpen = false;
  id: any;

  ngOnInit(): void {
    debugger;
    this.id = Number(localStorage.getItem('User_Id'));
  }
  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('User_Id');

    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
