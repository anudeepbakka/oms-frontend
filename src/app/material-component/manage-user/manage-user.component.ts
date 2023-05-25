import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit {
  displayedColumns: string[]=['name', 'email','contactNumber','status']
  dataSource:any;
  responseMsg:any;
  constructor(
    private userService: UserService,
    private snackservice:SnackbarService,

  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  tableData(){
    this.userService.getUsers().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      if(error.error.message){
        this.responseMsg = error.error?.message;
      }
      else{
        this.responseMsg =GlobalConstants.genericError
      }
      this.snackservice.openSnackBar(this.responseMsg,GlobalConstants.error)
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
  }

  handleChangeAction(status:any,id:any){
    var data={
      status:status.toString(),
      id:id
    }
    this.userService.update(data).subscribe((response:any)=>{
      this.responseMsg=response?.message;
      this.snackservice.openSnackBar(this.responseMsg,"Success")
    },(error:any)=>{
      if(error.error.message){
        this.responseMsg = error.error?.message;
      }
      else{
        this.responseMsg =GlobalConstants.genericError
      }
      this.snackservice.openSnackBar(this.responseMsg,GlobalConstants.error)
    }
    )
  }

}
