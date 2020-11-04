import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { EmployeeDetailsService } from '../../services/employee/employee-details.service';
import { EmployeeDetails} from '../../interfaces/employee-details';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { SelectedAgentsNotificationModel } from 'src/app/models/selected-agents-models';
import { NotificationsModel } from 'src/app/models/notifications.models';
import { NotificationAndroidMessaging } from 'src/app/interfaces/notifications-android-messaging';
import { AgentsDetails } from 'src/app/interfaces/agents-details';
import { NotificationsReportsService } from 'src/app/services/notifications/notifications-reports.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  //Angular Material Table and Filter Function
  filterValues = {};
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['ID', 'Area', 'Name', 'Last Name', 'Email' , 'Password', 'Location', 'Date Register', 'Phone Number'];
  filterSelectObj = [];
  //create a object and then each object have this items
  lstSelectedAgents:SelectedAgentsNotificationModel[];
  notification: NotificationsModel = new NotificationsModel();

  //Declare interface for share notification
  notificationMessaging: NotificationAndroidMessaging = new NotificationAndroidMessaging();

  agentDetails: AgentsDetails;


  formNotification: FormGroup;
  employeeDetailLst: EmployeeDetails[];

  //Employee Registered Model
  registerEmployee: EmployeeDetails = new EmployeeDetails();

  //navigation parameter
  siteId;

    //Add paginator with angular material
 @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;

  }

  constructor( private fb: FormBuilder,
               private activatedRoute: ActivatedRoute,
               private serviceEmployeeDetail: EmployeeDetailsService,
               private dialogEmployeeRegister: MatDialog,
               private notificationMessagingService: NotificationsReportsService) {
                this.createFormNotifications();
                this.filterSelectObj = [
                  {
                    name: 'Area',
                    columnProp: 'employeeLastName',
                    options: []
                  }, {
                    name: 'Location',
                    columnProp: 'employeeRegisterLocation',
                    options: []
                  }, {
                    name: 'Name',
                    columnProp: 'employeeName',
                    options: []
                  }
                ]
              }

  ngOnInit(): void {

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log("this is de id navigate ON EMPLOYEE")
    console.log(id);
    this.siteId = id;

    this.getAllSiteEmployeeRegister();

    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
  }
      //Function for data filtering table
      // Get Uniqu values from columns to build filter
      getFilterObject(fullObj, key) {
        const uniqChk = [];
        fullObj.filter((obj) => {
          if (!uniqChk.includes(obj[key])) {
            uniqChk.push(obj[key]);
          }
          return obj;
        });
        return uniqChk;
      }




   getAllSiteEmployeeRegister(){
    this.serviceEmployeeDetail.getSiteEmployeeDetails(this.siteId.toString())
    .subscribe((data:EmployeeDetails[])=> {
      this.employeeDetailLst = data;
      console.log(this.employeeDetailLst)
      this.dataSource.data = this.employeeDetailLst;
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(this.employeeDetailLst, o.columnProp);
      });
   });
}


  employeeRegister(){
    const dialogRef = this.dialogEmployeeRegister.open(EmployeeDialogComponent, {data: this.siteId});
    dialogRef.afterClosed().subscribe(()=>{return this.getAllSiteEmployeeRegister();

      });

  }

  createFormNotifications(){

    this.formNotification = this.fb.group({
    //property:  [content form default, [validatorArray sync need All] , validator async]
      title    : ['', [Validators.required, Validators.minLength(5)] ],
      message: ['', Validators.required],
      state: []
    });
  }

  shareNotification(){

   console.log(this.formNotification);
    console.log("notification object" + this.notification.message + this.notification.title);

    //test get php mysql agent per state
    this.notificationMessagingService.getAgents(this.notification.state)
      .subscribe ( (data: SelectedAgentsNotificationModel[]) => {
        this.lstSelectedAgents = data ;
        this.notification.agentsTokenFCM = [];
        for ( let i = 0; i < this.lstSelectedAgents.length; i ++){
          var obj = this.lstSelectedAgents[i];
          console.log(obj.TOKEN_FCM);
          this.notification.agentsTokenFCM.push(obj.TOKEN_FCM);
         }
        }
      )

           //test post php mysql
           this.notificationMessagingService.shareAndroidNotificationFCM(this.notification)
           .subscribe(resp => {
             console.log(this.notification.message);
             console.log(this.notification.title);
             console.log(this.notification.agentsTokenFCM);
             console.log(resp);
         //    console.log(this.notification);
           });

      console.log(this.notification);

    //Valid all field if share in pressed for valid the form
    if(this.formNotification.invalid){
     return Object.values(this.formNotification.controls).forEach(control => {
       if( control instanceof FormGroup ){
         Object.values(control.controls).forEach(control => control.markAsTouched());
       }else{
        control.markAsTouched();
            }
      });
    }

  }





    // Called on Filter change
    filterChange(filter, event) {
      //let filterValues = {}
      this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
      this.dataSource.filter = JSON.stringify(this.filterValues)
      }

    // Custom filter method fot Angular Material Datatable
    createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      console.log(searchTerms);

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
        } else {
          return true;
        }
      }
      return nameSearch()
    }

    return filterFunction
    }
    // Reset table filters
    resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value, key) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
    }



}
