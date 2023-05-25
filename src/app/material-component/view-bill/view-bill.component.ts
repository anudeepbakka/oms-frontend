import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BillService } from 'src/app/services/bill.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  displayedColumns: string[]=['name', 'email','contactNumber','paymentMethod','Total','action']
  dataSource:any;
  responseMsg:any;

  constructor(
    private bill:BillService,
    private snackservice:SnackbarService,
    private dialog:MatDialog,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.tableData()
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue ? filterValue.trim().toLowerCase() : '';
  }

  tableData(){
    this.bill.getBills().subscribe((response:any)=>{
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

  handleViewAction(value:any){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.data={
      data:value
    };
    dialogconfig.width="100%"
    const dialogRef = this.dialog.open(ViewBillProductsComponent,dialogconfig)
    this.router.events.subscribe(()=>{
      dialogRef.close();
    })
  }

  downloadReportAction(value:any){
    var data = {
      name: value.name,
      email: value.email,
      uuid: value.uuid,
      contactNumber: value.contactNumber,
      paymentMethod:value.paymentMethod,
      totalAmount:value.totalAmount,
      productDetails: value.productDetails
    }
    this.bill.getPdf(data).subscribe((response: any) => {
      saveAs(response,value.uuid+'.pdf')

    }, (error: any) => {
      if (error.error?.message) {
        this.responseMsg = error.error?.message;
      }
      else {
        this.responseMsg = GlobalConstants.genericError;
      }
      this.snackservice.openSnackBar(this.responseMsg, GlobalConstants.error);
    })
  }

  handleDeleteAction(value:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data={
      message:'delete' + value.name+'product'
    };
    const dialogref = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogref.componentInstance.onEmitStatusChange.subscribe((res)=>{
      this.deleteBill(value.id);
      dialogref.close()
    })
  }

  deleteBill(value:any){
    this.bill.delete(value).subscribe((res:any)=>{
      this.tableData();
      this.responseMsg=res?.message
      this.snackservice.openSnackBar(this.responseMsg,"success")
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


}
