import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(private userservice:UserService,private router:Router){}

  ngOnInit(){
    this.userservice.logout();
    this.router.navigate([''])
  }
}
