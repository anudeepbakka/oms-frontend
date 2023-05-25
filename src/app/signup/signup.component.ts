import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: any = FormGroup;
  responseMessege: any

  constructor(private formBuilder: FormBuilder, private route: Router, private userService: UserService, private snackbar: SnackbarService, private dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailregex)]],
      contact: [null, [Validators.required, Validators.pattern(GlobalConstants.contactRegex)]],
      password: [null, [Validators.required]],
    })
  }

  handleSumbit() {
    // this.ngxService.start()
    var formData = this.signUpForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      password: formData.password
    }
    this.userService.signup(data).subscribe((res: any) => {
      var hello = res
      // this.ngxService.stop()
     
      this.dialogRef.close();
      this.responseMessege = res?.message;
      if (this.responseMessege == 'Please register') {
        this.snackbar.openSnackBar(this.responseMessege, 'hint')
      } else {
        this.snackbar.openSnackBar(this.responseMessege, 'green')
      }
      ;
      if(!localStorage.getItem('Token')){
        this.route.navigate(['/'])
      }
      
    }, (error: any) => {
      // this.ngxService.stop()
      if (error.error?.message) {
        this.responseMessege = error.error?.message;
      }
      else {
        this.responseMessege = GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMessege, GlobalConstants.error);
    })
  }

}
