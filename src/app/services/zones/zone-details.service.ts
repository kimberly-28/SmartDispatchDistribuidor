import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZoneDetails } from 'src/app/interfaces/zone-details';

@Injectable({
  providedIn: 'root'
})
export class ZoneDetailsService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminWebServices/';
  constructor(private http: HttpClient) { }


  getZoneDetails(){
    return this.http.get<ZoneDetails[]>(`${this.url}GetZoneDetails.php`);
  }

}



