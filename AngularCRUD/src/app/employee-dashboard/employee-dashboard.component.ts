import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dash board.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
delete_Employee(_t19: any) {
throw new Error('Method not implemented.');
}

formValue !: FormGroup;
employeeModelObj : EmployeeModel = new EmployeeModel();
 employeeData!: any; 

constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmployee();
  }
postEmployeeDetails(){
  this.employeeModelObj.fristName = this.formValue.value.firstName;
  this.employeeModelObj.lastName = this.formValue.value.lastName;
  this.employeeModelObj.email = this.formValue.value.email;
  this.employeeModelObj.mobile = this.formValue.value.mobile;
  this.employeeModelObj.salary = this.formValue.value.salary;
 
  this.api.postEmployee(this.employeeModelObj)
  .subscribe((res: any): void=> {
    console.log(res);
    alert("Employee Added Successfully")
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllEmployee();
  },
  (err: any)=> {
    alert("Something went wrong");
  })
}
getAllEmployee(){
  this.api.getEmployee()
  subscribe((res: any): void=> {
    console.log(res);
    this.employeeData=res;
  })
}
deleteEmployee(row : any){
  this.api.getEmployee();
  subscribe((res: any): void=> {
    alert("Employee Deleted")
  })
}
updateEmployee(row : any){
  this.api.getEmployee();
  subscribe((res : any) : void=>{
    alert("Employee updated successfully")
  })
}
}
function subscribe1(this: any, arg0: (res: any) => void) {
  throw new Error('Function not implemented.');
}

function subscribe(arg0: (res: any) => void) {
  throw new Error('Function not implemented.');
}

