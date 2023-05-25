import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {
  displayedColumns:string[]=['name','categoryName','description','price','edit']
  dataSource:any;
  responseMessage:any;
  constructor(
    private productService:ProductService,
    private SnackbarService:SnackbarService,
    private dialog:MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.tabledata();
  }

  tabledata(){
    this.productService.getProducts().subscribe((response:any)=>{
      this.dataSource = new MatTableDataSource(response);
    },(error:any)=>{
      if(error.error.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage =GlobalConstants.genericError
      }
      this.SnackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
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
    const dialogref = this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogref.close()
    });
    const sub  = dialogref.componentInstance.onAddProduct.subscribe(
      (res)=>{
        this.tabledata();
      }
    )


  }

  handleEditAction(value:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      action:'Edit',
      Data:value
    }
    dialogConfig.width="850px"
    const dialogref = this.dialog.open(ProductComponent,dialogConfig);
    this.router.events.subscribe(()=>{
      dialogref.close()
    });
    const sub  = dialogref.componentInstance.onEditProduct.subscribe(
      (res)=>{
        this.tabledata();
      }
    )


  }

  handleDeleteAction(value:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data={
      message:'delete' + value.name+'product'
    };
    const dialogref = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogref.componentInstance.onEmitStatusChange.subscribe((res)=>{
      this.deleteproduct(value.id);
      dialogref.close()
    })
  }

  deleteproduct(id:any){
    this.productService.delete(id).subscribe((res:any)=>{
      this.tabledata();
      this.responseMessage=res?.message
      this.SnackbarService.openSnackBar(this.responseMessage,"success")
    },(error:any)=>{
      if(error.error.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage =GlobalConstants.genericError
      }
      this.SnackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }

  onChange(status:any,id:any){
    var data={
      status:status.toString(),
      id:id
    }
    this.productService.updatedStatus(data).subscribe((res:any)=>{
      this.responseMessage=res?.message;
      this.SnackbarService.openSnackBar(this.responseMessage,"success")
    },(error:any)=>{
      if(error.error.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage =GlobalConstants.genericError
      }
      this.SnackbarService.openSnackBar(this.responseMessage,GlobalConstants.error)
    })
  }

}
