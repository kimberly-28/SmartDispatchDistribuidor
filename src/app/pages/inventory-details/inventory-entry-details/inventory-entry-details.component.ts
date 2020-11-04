import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InventoryEntryModel } from 'src/app/models/inventory-entry.model';
import { InventoryDetails } from 'src/app/interfaces/inventory-details';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { ProductDetails } from 'src/app/interfaces/products-details';
import { ProductsService } from 'src/app/services/products/products.service';
import { InventoryInfoEntryDetails } from 'src/app/interfaces/inventory-info-entry-details';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ProductInventoryDetails } from 'src/app/interfaces/product-inventory-details';
import { WarehouseDetail } from 'src/app/interfaces/warehouse-details';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inventory-entry-details',
  templateUrl: './inventory-entry-details.component.html',
  styleUrls: ['./inventory-entry-details.component.css']
})
export class InventoryEntryDetailsComponent implements OnInit {

//Angular Material Table and Filter Function
  filterValues = {};
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Product Name','Product Code' , 'Quantity', 'Entry Date', 'Expiry Dates'];
  filterSelectObj = [];

  formInventoryEntry: FormGroup;

  //Inventory
  inventoryDetailsList: InventoryDetails [];
  inventoryDetails: InventoryDetails;

  //Inventory Entry
  inventoryInfoEntryDetailsList: InventoryInfoEntryDetails[]

  //Products
  productDetailsList: ProductDetails[];
  productDetails: ProductDetails;

  //Inventory Entry Model
  inventoryEntry: InventoryEntryModel = new InventoryEntryModel();

  //Inventory Product Details before entry
  showProductDetails: ProductInventoryDetails[];

  //Warehouse data management
  showDataReferenceWarehouse: WarehouseDetail;
  registerWarehouseMoving: WarehouseDetail = new WarehouseDetail();

  //navigation parameter
  siteId;

   //Add paginator with angular material
   @ViewChild(MatPaginator) paginator: MatPaginator;


    // we need know about the life cycle components in angular
    //ngAfterViewInit : A lifecycle hook that is called after Angular has fully initialized a component's
    // view. Define an ngAfterViewInit() method to handle any additional initialization tasks.
    // in this case, we need to implement the pagination after the data Source is charged in the table
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    }



  constructor( private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private serviceInventoryDetails: InventoryService,
    private serviceProductDetails: ProductsService) {


        this.createForm();
        this.filterSelectObj = [
          {
            name: 'Product',
            columnProp: 'entryStateName',
            options: []
          }
        ]
  }

  ngOnInit(): void {

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log("this is de id navigate ON PRODUCTS")
    console.log(id);
    this.siteId = id;

    this.getAllInventorySiteEntryDetails();
    this.selectProduct();

    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;

  }

  get invalidIdInventory(){
    return this.formInventoryEntry.get('idInventory').invalid && this.formInventoryEntry.get('idInventory').touched
  }
  get invalidLasIdProduct(){
    return this.formInventoryEntry.get('idProduct').invalid && this.formInventoryEntry.get('idProduct').touched
  }
  get invalidInventoryEntryQuantityProducts(){
    return this.formInventoryEntry.get('inventoryEntryQuantityProducts').invalid && this.formInventoryEntry.get('inventoryEntryQuantityProducts').touched
  }
  get invalidInventoryEntryDate(){
    return this.formInventoryEntry.get('inventoryEntryDate').invalid && this.formInventoryEntry.get('inventoryEntryDate').touched
  }
  get invalidInventoryEntryExpiryDate(){
    return this.formInventoryEntry.get('inventoryEntryExpiryDate').invalid && this.formInventoryEntry.get('inventoryEntryExpiryDate').touched
  }


  createForm(){
    this.formInventoryEntry = this.fb.group({
    //property:  [content form default, [validatorArray sync need All] , validator async]
      idProduct                       : ['', Validators.required],
      inventoryEntryQuantityProducts  : ['', Validators.required],
      inventoryEntryDate              : ['', Validators.required],
      inventoryEntryExpiryDate        : ['', Validators.required],
    });
  }

  shareInventoryEntry(){

    let totalProduct;
    let stockProduct;
    let publishedProduct;

    this.inventoryEntry.idSiteStore = this.siteId;

      console.log(this.formInventoryEntry);
      console.log(this.inventoryEntry.idSiteStore);
      console.log(this.inventoryEntry.idProduct);
      console.log(this.inventoryEntry.inventoryEntryQuantityProducts);
      console.log(this.inventoryEntry.inventoryEntryDate);
      console.log(this.inventoryEntry.inventoryEntryExpiryDate);
      console.log(this.inventoryEntry);
      console.log("sumaraize entry products:")

       //Valid all field if share in pressed for valid the form
       if(this.formInventoryEntry.valid){
        this.serviceInventoryDetails.postNewInventorySiteEntry(this.inventoryEntry)
        .subscribe(data=>{
          console.log(data);
          this.getAllInventorySiteEntryDetails();
         })


         this.serviceInventoryDetails.getWarehouseSiteDataReferenceProduct(this.inventoryEntry.idProduct.toString(), this.inventoryEntry.idSiteStore.toString())
         .subscribe((data:WarehouseDetail[]) => {

          if(data != null){

            totalProduct = data.map(function(data){
              return data.warehouseTotalProducts;
            });

            stockProduct = data.map(function(data){
             return data.warehouseStockProducts;
           });

           publishedProduct = data.map(function(data){
             return data.warehousePublishedProducts;
           });

          }else{
            totalProduct = "0";
            stockProduct = "0";
            publishedProduct = "0";
          }

          console.log(data);
          console.log(Number(totalProduct));
          console.log(Number(stockProduct));
          console.log(Number(publishedProduct));

           this.registerWarehouseMoving.idSiteStore = this.inventoryEntry.idSiteStore;
           this.registerWarehouseMoving.idProduct = this.inventoryEntry.idProduct;
           this.registerWarehouseMoving.warehouseMovingType = "ENTRY";
           this.registerWarehouseMoving.warehousePublishedProducts = Number(publishedProduct);
           this.registerWarehouseMoving.warehouseStockProducts = (Number(totalProduct) + Number(this.inventoryEntry.inventoryEntryQuantityProducts));
           this.registerWarehouseMoving.warehouseTotalProducts = (Number(stockProduct) + Number(this.inventoryEntry.inventoryEntryQuantityProducts));

           console.log(this.registerWarehouseMoving);

            this.serviceInventoryDetails.postWarehouseSiteNewInventoryEntry(this.registerWarehouseMoving)
           .subscribe(data=>{
             console.log(data);
             this.serviceInventoryDetails.getProductInfoOnSelectedSite(this.inventoryEntry.idProduct.toString(), this.inventoryEntry.idSiteStore.toString())
             .subscribe((data:ProductInventoryDetails[])=> {
               this.showProductDetails = data;
               console.log(this.showProductDetails)
                })
            })

         })

        return Object.values(this.formInventoryEntry.controls).forEach(control => {
          if( control instanceof FormGroup ){
            Object.values(control.controls).forEach(control => control.markAsTouched());
          }else{
           control.markAsTouched();
               }
         });
       }


  }

  selectProduct(){
      //test get php mysql agent per state
      this.serviceProductDetails.getAllProductsDetails()
      .subscribe ((data: ProductDetails[]) => {
             this.productDetailsList = data;
             console.log(this.productDetailsList)
             }
      )
  }

   //Test select save the value selected
   modifiedText:string;
   empSelected: any = {};

   productIdOnSelected: string;

   onProductSelected(inventory:InventoryDetails){
    this.setProductIdValue(inventory);
  }

  setProductIdValue(val){
    console.log(val)
    this.productIdOnSelected = val
      //TEST product 7 Y inventary 4
    this.serviceInventoryDetails.getProductInfoOnSelectedSite(this.productIdOnSelected, this.siteId.toString())
    .subscribe((data:ProductInventoryDetails[])=> {
      this.showProductDetails = data;
      console.log(this.showProductDetails)
       })
  }


  //Function for data filtering table
 // Get Uniqu values from columns to build filter
 getFilterObject(fullObj, key) {
  const uniqChk = [];
  fullObj.filter((obj) => {
    if (!uniqChk.includes(obj[key])) {
      uniqChk.push(obj[key]);
    }
    return obj;
  });
  return uniqChk;
}

 // Get remote serve data using HTTP call
 //get all data inventory
 getAllInventorySiteEntryDetails() {
  this.serviceInventoryDetails.getAllInventorySiteEntryDetails(this.siteId.toString()).subscribe((data:InventoryInfoEntryDetails[])=>{
    this.inventoryInfoEntryDetailsList = data;
    this.dataSource.data = this.inventoryInfoEntryDetailsList;
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.inventoryInfoEntryDetailsList, o.columnProp);
    });
  });
}


    // Called on Filter change
    filterChange(filter, event) {
    //let filterValues = {}
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
    }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
  let filterFunction = function (data: any, filter: string): boolean {
    let searchTerms = JSON.parse(filter);
    let isFilterSet = false;
    for (const col in searchTerms) {
      if (searchTerms[col].toString() !== '') {
        isFilterSet = true;
      } else {
        delete searchTerms[col];
      }
    }

    console.log(searchTerms);

    let nameSearch = () => {
      let found = false;
      if (isFilterSet) {
        for (const col in searchTerms) {
          searchTerms[col].trim().toLowerCase().split(' ').forEach(word => {
            if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
              found = true
            }
          });
        }
        return found
      } else {
        return true;
      }
    }
    return nameSearch()
  }

  return filterFunction
  }
  // Reset table filters
  resetFilters() {
  this.filterValues = {}
  this.filterSelectObj.forEach((value, key) => {
    value.modelValue = undefined;
  })
  this.dataSource.filter = "";
  }


}
