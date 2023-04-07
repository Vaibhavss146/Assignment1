import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  LoginForm!: FormGroup;
  email! : string;
  password! : string;
  constructor(private fb:FormBuilder,private router:Router,private userservice:UserService){}


  ngOnInit(){
    this.LoginForm = this.fb.group({
      'email':['',[Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      'password':['',[Validators.required]]
    })
  }

onSubmit(data:any){
this.email = data.email;
this.password = data.paaword
  console.log(this.email,this.password)
 this.userservice.login(this.email,this.password).subscribe((data:any)=>{
  console.log("Is Login Success: " + data); 
  if(data)this.router.navigate(['/home'])
 })
}
  get form(){
    return this.LoginForm.controls;
  }
}
