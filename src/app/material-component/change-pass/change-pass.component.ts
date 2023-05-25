import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {
changepasswoedform:any = FormGroup;
responsemsg:any;
  constructor(private formbuilder:FormBuilder,private user:UserService,public dialogref:MatDialogRef<ChangePassComponent>,private snackbar:SnackbarService) { }

  ngOnInit(): void {
    this.changepasswoedform = this.formbuilder.group({
      oldpass:[null,[Validators.required]],
      newpass:[null,[Validators.required]],
      confirmPass:[null,[Validators.required]],
    })
    
  }

  validateSubmit(){
    if(this.changepasswoedform.controls['newpass'].value != this.changepasswoedform.controls['oldpass'].value){
      return true
    }
    else{
      return false
    }
  }

  handlechangePassSubmit(){
    var formdata = this.changepasswoedform.value;
    var data = {
      oldPassword: formdata.oldpass,
      newPassword: formdata.newpass,
      confirmPass: formdata.confirmPass

    }
   
    this.user.changePassword(data).subscribe((res:any)=>{
      this.responsemsg=res?.message
      this.dialogref.close()
      this.snackbar.openSnackBar(this.responsemsg,"success")
    },(error)=>{
     
      if(error.error.message){
        this.responsemsg = error.error?.message
      }else{
        this.responsemsg =GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responsemsg,GlobalConstants.error)
    })
  }
  }


