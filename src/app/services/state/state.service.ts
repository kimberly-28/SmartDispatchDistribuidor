import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateDetails } from 'src/app/interfaces/states.details';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminWebServices/';
  constructor(private http: HttpClient) { }


  getStateDetails(){
    return this.http.get<StateDetails[]>(`${this.url}GetEmployeesDetails.php`);
  }

}



