import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  isDropdownOpen = false;
  id: any;

  ngOnInit(): void {
    debugger;
    this.id = Number(localStorage.getItem('User_Id'));
  }
  logout() {
    console.log("logout")
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
