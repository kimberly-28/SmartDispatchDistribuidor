import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationAndroidMessaging } from 'src/app/interfaces/notifications-android-messaging';
import { map } from 'rxjs/operators'
import { AgentsDetails } from 'src/app/interfaces/agents-details';
import { NotificationsModel } from 'src/app/models/notifications.models';
import { SelectedAgentsNotificationModel } from 'src/app/models/selected-agents-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsReportsService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminWebServices/';
  constructor(private http: HttpClient) {}


  shareAndroidNotificationFCM( notificationAndroidMessaging: NotificationAndroidMessaging){
    return this.http.post(`${this.url}PostMessagingAndroidNotifications.php`, notificationAndroidMessaging,  {responseType: 'text'})
      .pipe(
        map( (resp: any) => {
          notificationAndroidMessaging.title = notificationAndroidMessaging.title;
          notificationAndroidMessaging.message = notificationAndroidMessaging.message;
          return notificationAndroidMessaging;
        })
      );
  }



  getAgents(state: string){
    let params1 = new HttpParams().set('state', state);
    return this.http.get<SelectedAgentsNotificationModel[]>(`${this.url}GetTokenFCMState.php`,{params: params1})
  }

  private createArraySelectedAgents( selectedAgentsObj: object ){

    const agents: NotificationsModel[] = [];
    console.log(selectedAgentsObj);
    if( selectedAgentsObj == null ){ return []; }

    Object.keys(selectedAgentsObj).forEach(key => {
      const agent: NotificationsModel = selectedAgentsObj[key];
      agent.message = key;

      agents.push(agent);
    })

    return agents;
  }
}
