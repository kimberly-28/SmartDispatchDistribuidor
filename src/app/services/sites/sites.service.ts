import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SiteUserRegister } from 'src/app/models/site-user-register.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SitesService {


  redirectUrl: string;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminSitesWebServices/';
  constructor(private http: HttpClient) { }

  postRegisterSite(registerSite: SiteUserRegister){
    return this.http.post(`${this.url}PostRegisteredSite.php`, registerSite,  {responseType: 'text'} );
  }

  userlogin(siteStoreUserEmail, siteStoreUserPassword) {
    alert(siteStoreUserEmail)
    return this.http.post(`${this.url}LoginSiteUsers.php`, {siteStoreUserEmail,siteStoreUserPassword},  {responseType: 'json'} )
    .pipe(map((resp:any) => {
      this.setToken(resp[0].siteStoreId);
      console.log( this.setToken(resp[0].siteStoreId))
      this.getLoggedInName.emit(true);
      return resp;
      }
    ));
    }

  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
    }
    getToken() {
    return localStorage.getItem('token');
    }
    deleteToken() {
    localStorage.removeItem('token');
    }
    isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true
    }
    return false;
    }

}
