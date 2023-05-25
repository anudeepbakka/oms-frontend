import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackbar:MatSnackBar) { }

  openSnackBar(messege:string, action:string){
    if(action == 'error'){
      this.snackbar.open(messege,'',{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:2000,
        panelClass:['blue-snackbar']
      });
    }
    else{
      this.snackbar.open(messege,'',{
        horizontalPosition:'center',
        verticalPosition:'top',
        duration:2000,
        panelClass:['green-snackbar']
      });
    }
  }
}
