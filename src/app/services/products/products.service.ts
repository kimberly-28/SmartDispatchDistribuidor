import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductDetails } from 'src/app/interfaces/products-details';
import { ProductModel } from 'src/app/models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminSitesWebServices/';
  allUrl = 'https://domappssuiteservices.com/SmartControl2020/WebAdminWebServices/';
  constructor(private http: HttpClient) { }


  getAllSiteProductsDetails(idSiteStore: string): Observable<any>{
    let params1 = new HttpParams().set('idSiteStore', idSiteStore);
    return this.http.get<ProductDetails[]>(`${this.url}GetAllSiteProductDetails.php`,{params:params1});
  }

  getAllProductsDetails(){
    return this.http.get<ProductDetails[]>(`${this.allUrl}GetAllProductDetails.php`);
  }

}
