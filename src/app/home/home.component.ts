import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog, private router:Router,private userService:UserService) { }

  ngOnInit(): void {
    if(localStorage.getItem('Token')!=null){
      this.userService.checktoken().subscribe((res:any)=>{
        this.router.navigate(['/oms/dashboard']);
      },(error:any)=>{
       
      })
    }
  }

  signupAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(SignupComponent,dialogConfig)
  }

  forgotPass(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ForgotPasswordComponent,dialogConfig)
  }

  login(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginPageComponent,dialogConfig)
  }

}
