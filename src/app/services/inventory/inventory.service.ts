import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InventoryDetails } from 'src/app/interfaces/inventory-details';
import { InventoryEntryModel } from 'src/app/models/inventory-entry.model';
import { InventoryInfoEntryDetails } from 'src/app/interfaces/inventory-info-entry-details';
import { ProductInventoryDetails } from 'src/app/interfaces/product-inventory-details';
import { Observable } from 'rxjs';
import { InventoryPublishedModel } from 'src/app/models/inventory-published.model';
import { SitesStoreDetails } from 'src/app/interfaces/site-store-details';
import { InventoryInfoPublishedDetails } from 'src/app/interfaces/inventory-info-published-details';
import { WarehouseDetail } from 'src/app/interfaces/warehouse-details';
import { WarehouseDetailsGlobalInfo } from 'src/app/interfaces/warehouse-info-details';
import { ProductSiteDetails } from 'src/app/interfaces/product-site-details';
import { WebProductPublishedDetails } from 'src/app/interfaces/web-product-published-details';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminSitesWebServices/';
  constructor(private http: HttpClient) { }


  getSiteWarehouseDetails(idSiteStore: string): Observable<any>{
    let params1 = new HttpParams().set('idSiteStore', idSiteStore);
    return this.http.get<WarehouseDetailsGlobalInfo[]>(`${this.url}GetSiteWarehouseDetails.php`,{params:params1});
  }

  postNewInventorySiteEntry(inventoryEntry: InventoryEntryModel){
    return this.http.post(`${this.url}PostNewInventorySiteEntry.php`, inventoryEntry,  {responseType: 'text'} );
  }

  postNewInventorySitePublished(inventoryPublished: InventoryPublishedModel){
    return this.http.post(`${this.url}PostNewInventorySitePublished.php`, inventoryPublished,  {responseType: 'text'} );
  }

  getAllInventorySiteEntryDetails(idSiteStore: string): Observable<any>{
    let params1 = new HttpParams().set('idSiteStore', idSiteStore);
    return this.http.get<InventoryInfoEntryDetails[]>(`${this.url}GetAllInventorySiteEntryDetails.php`,{params:params1});
  } 

  getAllInventoryPublishedSiteDetails(idSiteStore: string): Observable<any>{
    let params1 = new HttpParams().set('idSiteStore', idSiteStore);
    return this.http.get<InventoryInfoEntryDetails[]>(`${this.url}GetAllInventoryPublishedSiteDetails.php`,{params:params1});
  }

  getAllWebPublishedProducts(){
    return this.http.get<WebProductPublishedDetails[]>(`${this.url}GetAllWebPublishedProducts.php`);
  }

  getProductInfoOnSelectedSite(idProduct: string, idSiteStore: string): Observable<any>{
    let params1 = new HttpParams().set('idProduct', idProduct).set('idSiteStore', idSiteStore);
    return this.http.get<ProductSiteDetails[]>(`${this.url}GetProductInfoOnSelectedSite.php`,{params:params1})
  }

  getAllSitesInventory(){
    return this.http.get<SitesStoreDetails[]>(`${this.url}GetAllSitesStoreDetails.php`);
  }

  //Insert data into warehouse
  getWarehouseSiteDataReferenceProduct(idProduct: string, idSiteStore: string): Observable<any>{
    let params1 = new HttpParams().set('idProduct', idProduct).set('idSiteStore', idSiteStore);
    return this.http.get<WarehouseDetail[]>(`${this.url}GetWarehouseSiteReferenceProduct.php`,{params:params1})
  }


  postWarehouseSiteNewInventoryEntry(warehouseEntry: WarehouseDetail){
    return this.http.post(`${this.url}PostWarehouseSiteNewInventoryEntry.php`, warehouseEntry,  {responseType: 'text'} );
  }

  postWarehouseNewPublishedSiteProducts(warehouseEntry: WarehouseDetail){
    return this.http.post(`${this.url}PostWarehouseNewPublishedSiteProducts.php`, warehouseEntry,  {responseType: 'text'} );
  }

}
