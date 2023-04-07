import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  employeeList: Employee[] = [];
  employeeForm!: FormGroup;
  showAdd!:boolean;
  showEdit!:boolean;
  employeeId:any;
  items = [
    { column1: 'Row 1 Column 1', column2: 'Row 1 Column 2', column3: 'Row 1 Column 3' },
    { column1: 'Row 2 Column 1', column2: 'Row 2 Column 2', column3: 'Row 2 Column 3' },
    // Add more items here...
  ];
  currentPage = 1;
  constructor(private fb: FormBuilder, private userservice: UserService, private router: Router) { }
  ngOnInit() {
    this.employeeData();
    this.createForm();
  }

  employeeData() {
    this.userservice.getData('employees').subscribe((data: any) => {
      this.employeeList = data;
      console.log(this.employeeList)
    });
  }
  AddEmployee(){
    this.employeeForm.reset();
    this.showAdd = true;
    this.showEdit = false;

  }
  createForm() {
    this.employeeForm = this.fb.group({
      'id': [''],
      'emplId': [''],
      'firstName': ['', [Validators.required]],
      'lastName': ['', [Validators.required]],
      'email': ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      'dob': ['', [Validators.required]],
      'gender': ['', [Validators.required]],
      'education': ['', [Validators.required]],
      'company': ['', [Validators.required]],
      'experience': ['', [Validators.required]],
      'package': ['', [Validators.required]],

    })
  }
  onFormSubmit() {
    let data = this.employeeForm.value;
    this.userservice.postData('employees', data).subscribe((data: any) => {
      alert("Employee added successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.employeeForm.reset();
      this.employeeData();
      
    })
  }
  get form() {
    return this.employeeForm.controls;
  }
  editFormData(item:any){
    this.showAdd = false;
    this.showEdit = true;
  this.employeeForm.controls['firstName'].setValue(item.firstName);
  this.employeeForm.controls['lastName'].setValue(item.lastName);
  this.employeeForm.controls['email'].setValue(item.email);
  this.employeeForm.controls['dob'].setValue(item.dob);
  this.employeeForm.controls['gender'].setValue(item.gender);
  this.employeeForm.controls['education'].setValue(item.education);
  this.employeeForm.controls['company'].setValue(item.company);
  this.employeeForm.controls['experience'].setValue(item.experience);
  this.employeeForm.controls['package'].setValue(item.package);
  // this.employeeForm.controls['id'].setValue(item.id);
  this.employeeId = item.id
  }
  updateData(id:number){
    let path = 'employees/'+id
    let data = this.employeeForm.value;
    this.userservice.editData('employees/'+id,data).subscribe((data: any) => {
      console.log(data)
      alert("Employee updated successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.employeeForm.reset();
      this.employeeData();
    })
  }
deleteFormData(id:number){
  let path = "employees/"+id;
this.userservice.deleteData(path).subscribe((data:any)=>{
  alert("Are you sure...?");
  this.employeeData();
})
  }
   
  }
  

export interface Employee {
  id: number,
  emplId: number,
  firstName: string,
  lastName: string,
  email: string,
  gender: string,
  dob: number,
  education: string,
  company: string,
  experience: number,
  package:number
}

