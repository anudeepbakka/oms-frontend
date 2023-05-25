import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	data: any;
	responseMsg: any;

	ngAfterViewInit() { 
		this.dashboardData()
		
	}

	constructor(private dashboardsService: DashboardService,private snackbar:SnackbarService) {
	}

	dashboardData(){
		this.dashboardsService.getDetails().subscribe((response)=>{
			this.data = response;
		},(error)=>{
			console.log(error);
			if(error.error?.message){
				this.responseMsg = error.error?.message
			}else{
				this.responseMsg =GlobalConstants.genericError
			}
			this.snackbar.openSnackBar(this.responseMsg,GlobalConstants.error)
		})
	}

	
}
