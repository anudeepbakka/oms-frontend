import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPass:any = FormGroup;
  responseMsg:any ; 

  constructor(private formbuilder:FormBuilder, private userService:UserService, private dialogref:MatDialogRef<ForgotPasswordComponent>, private snackbar:SnackbarService) { }

  ngOnInit(): void {
    this.forgotPass = this.formbuilder.group({
    email: [null,[Validators.required,Validators.pattern(GlobalConstants.emailregex)]],
    })
  }

  handleSubmit(){
    // this.ngxService.start()
    var formData = this.forgotPass.value;
    var data = {
      email:formData.email
    }
    this.userService.forgotPassword(data).subscribe((result:any) => {
      // this.ngxService.stop();
      this.responseMsg = result?.message;
      this.dialogref.close();
      this.snackbar.openSnackBar(this.responseMsg,"")
    },(error)=>{
      // this.ngxService.stop();
      if(error.error?.message){
        this.responseMsg=error.error?.message
      }else{
        this.responseMsg=GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMsg,GlobalConstants.error)
    })
  }

}
