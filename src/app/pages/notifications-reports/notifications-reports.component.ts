import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators, NgForm, EmailValidator } from '@angular/forms';
import { isBuffer } from 'util';
import { NotificationAndroidMessaging } from 'src/app/interfaces/notifications-android-messaging';
import { NotificationsReportsService } from 'src/app/services/notifications/notifications-reports.service';
import { NotificationsModel } from 'src/app/models/notifications.models';
import Swal from 'sweetalert2'
import { type } from 'jquery';
import { AgentsDetails } from 'src/app/interfaces/agents-details';
import { SelectedAgentsNotificationModel } from 'src/app/models/selected-agents-models';
import { element } from 'protractor';

@Component({
  selector: 'app-notifications-reports',
  templateUrl: './notifications-reports.component.html',
  styleUrls: ['./notifications-reports.component.css']
})
export class NotificationsReportsComponent implements OnInit {

//  form: FormGroup;
  formNotification: FormGroup;

  //create a object and then each object have this items
  lstSelectedAgents:SelectedAgentsNotificationModel[];
  notification: NotificationsModel = new NotificationsModel();

  //Declare interface for share notification
  notificationMessaging: NotificationAndroidMessaging = new NotificationAndroidMessaging();

  agentDetails: AgentsDetails;


  constructor( private fb: FormBuilder,
               private notificationMessagingService: NotificationsReportsService) {
   //   this.createForm();
      this.createFormNotifications();

  }

  ngOnInit(): void {

  }
/*
  get invalidName(){
    return this.form.get('name').invalid && this.form.get('name').touched
  }
  get invalidLastName(){
    return this.form.get('lastName').invalid && this.form.get('lastName').touched
  }
  get invalidEmail(){
    return this.form.get('email').invalid && this.form.get('email').touched
  }
  get invalidCountry(){
    return this.form.get('address.country').invalid && this.form.get('address.country').touched
  }
  get invalidCity(){
    return this.form.get('address.city').invalid && this.form.get('address.city').touched
  }

  createForm(){

    this.form = this.fb.group({
    //property:  [content form default, [validatorArray sync need All] , validator async]
      name    : ['', [Validators.required, Validators.minLength(5)] ],
      lastName: ['', Validators.required],
      email   : ['', [Validators.required, Validators.email]],
      //Objects form
      address: this.fb.group({
        country: ['', Validators.required],
        city: ['', Validators.required],
      })
    });
  } */

/*   share(){
    console.log(this.form);
    //Valid all field if share in pressed for valid the form
    if(this.form.invalid){
     return Object.values(this.form.controls).forEach(control => {
       if( control instanceof FormGroup ){
         Object.values(control.controls).forEach(control => control.markAsTouched());
       }else{
        control.markAsTouched();
            }
      });
    }
  }

 */
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


  //function for clear object  Object.keys(this.lstSelectedAgents).forEach(k => delete this.lstSelectedAgents[k])

}
