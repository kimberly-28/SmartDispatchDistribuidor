import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZonesDetails } from 'src/app/interfaces/zones-details';

@Injectable({
  providedIn: 'root'
})
export class ZonesDetailsService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminWebServices/';
  constructor(private http: HttpClient) { }


  getZonesDetails(){
    return this.http.get<ZonesDetails[]>(`${this.url}GetZonesDetails.php`);
  }

}
