import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeDetails } from 'src/app/interfaces/employee-details';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeDetailsService } from 'src/app/services/employee/employee-details.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {


  employeeDetailLst: EmployeeDetails[];

  //Employee Registered Model
  registerEmployee: EmployeeDetails = new EmployeeDetails();
  //Form
   //navigation parameter
   siteId;

  formEmployeeRegister: FormGroup;
  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data,
              private activatedRoute: ActivatedRoute,
              private serviceEmployeeDetail: EmployeeDetailsService) {
                this.createForm();
              }

  ngOnInit(): void {
    console.log(this.data);
  }

  createForm(){
    this.formEmployeeRegister = this.fb.group({
    //property:  [content form default, [validatorArray sync need All] , validator async]
    employeeName             : ['', Validators.required],
    employeeLastName         : ['', Validators.required],
    employeeEmail            : ['', Validators.required],
    employeePassword         : ['', Validators.required],
    employeeRegisterLocation : ['', Validators.required],
    employeeDateRegister     : ['', Validators.required],
    employeePhoneNumber      : ['', Validators.required],
    });
  }

  shareRegisterEmployee(){
    console.log(this.registerEmployee);
    this.registerEmployee.employeeSiteId = this.data;
    this.serviceEmployeeDetail.postSiteRegisterEmployee(this.registerEmployee)
    .subscribe(data=>{
      console.log(data);
      this.getAllSiteEmployeeRegister();
    })
  }

  getAllSiteEmployeeRegister(){
    this.serviceEmployeeDetail.getSiteEmployeeDetails(this.siteId.toString())
    .subscribe((data:EmployeeDetails[])=> {
      this.employeeDetailLst = data;
      console.log(this.employeeDetailLst)
   });
}

}
