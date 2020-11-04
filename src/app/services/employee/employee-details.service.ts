import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EmployeeDetails} from '../../interfaces/employee-details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminSitesWebServices/';
  constructor(private http: HttpClient) { }

  postSiteRegisterEmployee(registerEmployee: EmployeeDetails){
    return this.http.post(`${this.url}PostSiteEmployeeRegister.php`, registerEmployee,  {responseType: 'text'} );
  }

  getSiteEmployeeDetails(idSiteStore: string): Observable<any>{
    let params1 = new HttpParams().set('idSiteStore', idSiteStore);
    return this.http.get<EmployeeDetails[]>(`${this.url}GetSiteEmployeeDetails.php`,{params:params1})
  }


}


