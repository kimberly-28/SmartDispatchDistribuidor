import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryDetails } from 'src/app/interfaces/country-details';


@Injectable({
  providedIn: 'root'
})
export class GlobalDetailsService {

    url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminWebServices/';
    constructor(private http: HttpClient) { }

    getGlobalDetails(){
      return this.http.get<CountryDetails[]>(`${this.url}GetGlobalDetails.php`);
    }

}
