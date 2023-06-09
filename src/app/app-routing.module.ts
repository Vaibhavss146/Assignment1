import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './user.guard';
import { HomeComponent } from './user/home/home.component';
import { LoginComponent } from './user/login/login.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home',component:HomeComponent,canActivate:[UserGuard]},
  {path:'login',component:LoginComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
