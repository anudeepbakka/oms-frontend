import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMsg: any;


  constructor(private userService: UserService, private formbuilder: FormBuilder, private router: Router, private dialogRef: MatDialogRef<LoginPageComponent>, private snackbar: SnackbarService) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({	
      email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailregex)]],
      password: [null,[Validators.required]],
    })
  }

  handleSubmit(){
    // this.ngxService.start()
    var formdata = this.loginForm.value;
    var data = {
      email: formdata.email,
      password: formdata.password
    }
    this.userService.login(data).subscribe((response:any)=>{
      this.dialogRef.close();
      localStorage.setItem('Token',response.token)
      
      this.router.navigate(['/oms/dashboard']);
      localStorage.setItem('Token',response.refreshToken)

    },(error)=>{
      if(error.error?.message){
        this.responseMsg=error.error?.message;
      }else{
        this.responseMsg=GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMsg,GlobalConstants.error)
    })
  }

}
