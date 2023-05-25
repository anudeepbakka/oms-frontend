import { ChangeDetectorRef, Component, EventEmitter, NgZone } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePassComponent } from 'src/app/material-component/change-pass/change-pass.component';
import { ConfirmationComponent } from 'src/app/material-component/confirmation/confirmation.component';
import { SignupComponent } from 'src/app/signup/signup.component';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  elapsedTime: any
  countdown: any;
  loginTime: any;
  timer: boolean = true;
  logoutTime: any = 10000000000;
  responseMessege: any;

  constructor(private router: Router,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef, private ngZone: NgZone,
    private user:UserService,
    private snack:SnackbarService) {

  }

  ngOnInit() {
    //this.autoLogout()
  }

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout'
    };
    const dialogref = this.dialog.open(ConfirmationComponent, dialogConfig)
    const sub = dialogref.componentInstance.onEmitStatusChange.subscribe((user) => {
      this.user.logout().subscribe((res:any)=>{
        this.responseMessege = res?.message;
        dialogref.close();
      localStorage.clear();
      this.router.navigate(['/'])
      console.log(this.responseMessege)
      this.snack.openSnackBar(this.responseMessege,"success" )
      })
      
    })
    
    
  }

  autoLogout() {

    this.user.logout().subscribe((res:any)=>{
      const loginTimecheck = localStorage.getItem('loginTime');
    if (!loginTimecheck) {
      localStorage.setItem('loginTime', Date.now().toString());
    }
    const loginTime = Number(localStorage.getItem('loginTime'));
    const endTime = loginTime + this.logoutTime;
    setInterval(() => {
      const remainingTime = endTime - Date.now();
      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      this.countdown = `${hours}h ${minutes}m ${seconds}s left`;

      this.cdRef.detectChanges();
      if (remainingTime <= 3000) {
        this.timer = false
      }
      if (remainingTime < 0) {
        localStorage.clear();
        this.router.navigate(['/'])
      }
    }, 1000);
    })

    
  }

  changePassword() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ChangePassComponent, dialogConfig);
  }

  signupAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(SignupComponent, dialogConfig)
  }


}











