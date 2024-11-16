import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  employees: any[] = [];
  employeeForm!: FormGroup;
  selectedEmployee: any;  // To store the selected employee
  @ViewChild('callDeleteDailog') deleteDailog !: TemplateRef<any>;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getEmployees();
    this.initEmployeeForm();
  }

  getEmployees(): void {
    this.employeeService.getAllUsersTrainer().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error fetching employee data:', error);
      }
    );
  }

  initEmployeeForm(): void {
    this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      addres: ['', Validators.required],
      gender: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      useremail: ['', [Validators.required, Validators.email]]
    });
  }

  openCreateEmpDialog(templateRef: any): void {
    this.dialog.open(templateRef);
  }

  saveEmployee(): void {
    if (this.employeeForm.valid) {
      const employeeData = {
        ...this.employeeForm.value,
        roleid: 2
      };
      debugger
      this.employeeService.createUser(employeeData).subscribe(
        (response) => {
          this.getEmployees()
          console.log('Employee created successfully:', response);
        },
        (error) => {
          console.error('Error creating employee:', error);
        }
      );
    } else {
      console.error('Form is invalid!');
    }
  }
  openUpdateEmpDialog(templateRef: any, employee: any): void {
    this.selectedEmployee = employee;  // Store the selected employee
    this.employeeForm.patchValue({
      username: employee.username,
      phone: employee.phone,
      addres: employee.addres,
      useremail: employee.useremail,
      gender: employee.gender,
      country: employee.country
    });
    this.dialog.open(templateRef);
  }

  updateEmployee(): void {
    if (this.employeeForm.valid) {
      const updatedEmployee = { ...this.selectedEmployee, ...this.employeeForm.value };
      this.employeeService.updateUser(updatedEmployee).subscribe(
        () => {
          this.getEmployees();  // Refresh the employee list
          this.dialog.closeAll();  // Close the dialog
        },
        (error) => {
          console.error('Error updating employee:', error);
        }
      );
    }
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(this.deleteDailog).afterClosed().subscribe((result) => {
      if (result != undefined) {
        if (result == 'yes') {
          this.employeeService.deleteUser(id).subscribe(
            () => {
              this.getEmployees();
            },
            (error) => {
              console.error('Error deleting employee:', error);
            }
          );
        }

        else if (result == 'No') {
          console.log('thank you')

        }
      }
    });
  }
}
