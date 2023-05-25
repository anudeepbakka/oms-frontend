import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { CategoryComponent } from '../dialog/category/category.component';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.scss']
})
export class ManageCategoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'edit'];
  dataSource: any;
  responseMessage: any;
  constructor(
    private category:CategoryService,
    private dialog:MatDialog,
    private snackbar:SnackbarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.tableData()
  }
  tableData(){
    this.category.getCategorys().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      if(error.error.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage =GlobalConstants.genericError
      }
      this.snackbar.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Add'
    }
    dialogConfig.width="850px"
    const dialogref = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogref.close()
    });
    const sub  = dialogref.componentInstance.onAddCategory.subscribe(
      (res)=>{
        this.tableData();
      }
    )


  }

  hadleEditAction(element:any){
    
   
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      data:element,
      action:'Edit'
    }
    dialogConfig.width="850px"
    const dialogref = this.dialog.open(CategoryComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogref.close()
    });
    const sub  = dialogref.componentInstance.onEditCategory.subscribe(
      (res)=>{
        this.tableData();
      }
    )


  }

}
