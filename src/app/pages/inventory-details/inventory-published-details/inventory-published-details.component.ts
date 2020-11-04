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
import { InventoryPublishedModel } from 'src/app/models/inventory-published.model';
import { SitesStoreDetails } from 'src/app/interfaces/site-store-details';
import { InventoryInfoPublishedDetails } from 'src/app/interfaces/inventory-info-published-details';
import { WarehouseDetail } from 'src/app/interfaces/warehouse-details';
import { ProductSiteDetails } from 'src/app/interfaces/product-site-details';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-inventory-published-details',
  templateUrl: './inventory-published-details.component.html',
  styleUrls: ['./inventory-published-details.component.css']
})
export class InventoryPublishedDetailsComponent implements OnInit {

//Angular Material Table and Filter Function
filterValues = {};
dataSource = new MatTableDataSource();
displayedColumns: string[] = ['Product Name' , 'Product Code', 'Quantity', 'Published Date', 'Status Product'];
filterSelectObj = [];

formInventoryPublished: FormGroup;

//Inventory
inventoryDetailsList: InventoryDetails [];
inventoryDetails: InventoryDetails;

//Products
productDetailsList: ProductDetails[];
productDetails: ProductDetails;

//Inventory Published Model
inventoryPublished: InventoryPublishedModel = new InventoryPublishedModel();

//Inventory Product Details before Published
showProductDetails: ProductInventoryDetails[];
//Get sites store list for publish product
siteStoreLst: SitesStoreDetails[];
// get list published table info
inventoryInfoPublishedDetailsList : InventoryInfoPublishedDetails[];

 //Warehouse data management
 showDataReferenceWarehouse: WarehouseDetail;
 registerWarehouseMoving: WarehouseDetail = new WarehouseDetail();

 //get product site detail info
showProductSiteDetails: ProductSiteDetails[];
 //List Product Selected
productSelectedLst = [];
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
    this.filterSelectObj =[
      {
        name: 'Product Name',
        columnProp: 'publishedProductName',
        options: []
      },
      {
        name: 'Status Product',
        columnProp: 'idStatusPublishedProduct',
        options: []
      }
    ]
}

ngOnInit(): void {

  let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
  console.log("this is de id navigate ON published")
  console.log(id);
  this.siteId = id;


  this.getAllInventoryPublishedDetails();
  this.selectProduct();

  this.dataSource.filterPredicate = this.createFilter();
  this.dataSource.paginator = this.paginator;

}
/*
get invalidIdInventory(){
  return this.formInventoryPublished.get('idInventory').invalid && this.formInventoryPublished.get('idInventory').touched
} */
get invalidLasIdProduct(){
  return this.formInventoryPublished.get('idProduct').invalid && this.formInventoryPublished.get('idProduct').touched
}
get invalidInventoryPublishedQuantityProducts(){
  return this.formInventoryPublished.get('inventoryPublishedQuantityProducts').invalid && this.formInventoryPublished.get('inventoryPublishedQuantityProducts').touched
}
get invalidInventoryPublishedDate(){
  return this.formInventoryPublished.get('inventoryPublishedDate').invalid && this.formInventoryPublished.get('inventoryPublishedDate').touched
}



createForm(){
  this.formInventoryPublished = this.fb.group({
  //property:  [content form default, [validatorArray sync need All] , validator async]
    idProduct                           : ['', Validators.required],
    inventoryPublishedQuantityProducts  : ['', Validators.required],
    inventoryPublishedDate              : ['', Validators.required],

  });
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


getInfoOnSelectedProductSite(siteId){
  console.log("change value")
  console.log(siteId)
  this.serviceInventoryDetails.getProductInfoOnSelectedSite(this.productIdOnSelected, siteId)
  .subscribe((data:ProductSiteDetails[])=> {
    this.showProductSiteDetails = data;
    console.log(this.showProductSiteDetails)
  })
}

//publish form
shareInventoryPublished(){

    let totalProduct;
    let stockProduct;
    let publishedProduct;

    this.inventoryPublished.idSiteStore = this.siteId;

    console.log(this.inventoryPublished);
    console.log(this.inventoryPublished.idSiteStore);
    console.log(this.inventoryPublished.idProduct);
    console.log(this.inventoryPublished.inventoryPublishedDate);
    console.log(this.inventoryPublished.inventoryPublishedQuantityProducts);
    console.log(this.inventoryPublished);
    console.log("sumaraize entry products:")

    //Valid all field if share in pressed for valid the form
    if(this.formInventoryPublished.valid){
      this.serviceInventoryDetails.getWarehouseSiteDataReferenceProduct(this.inventoryPublished.idProduct.toString(), this.inventoryPublished.idSiteStore.toString())
         .subscribe((data:WarehouseDetail[]) => {
          if(data != null){

            this.serviceInventoryDetails.postNewInventorySitePublished(this.inventoryPublished)
              .subscribe(data=>{
                console.log(data);
                this.getAllInventoryPublishedDetails();
              })

            totalProduct = data.map(function(data){
              return data.warehouseTotalProducts;
            });

            stockProduct = data.map(function(data){
             return data.warehouseStockProducts;
           });

           publishedProduct = data.map(function(data){
             return data.warehousePublishedProducts;
           });

           console.log(data);
           console.log(Number(totalProduct));
           console.log(Number(stockProduct));
           console.log(Number(publishedProduct));

            this.registerWarehouseMoving.idSiteStore = this.inventoryPublished.idSiteStore;
            this.registerWarehouseMoving.idProduct = this.inventoryPublished.idProduct;
            this.registerWarehouseMoving.warehouseMovingType = "PUBLISHED";
            this.registerWarehouseMoving.warehousePublishedProducts =(Number(publishedProduct) + Number(this.inventoryPublished.inventoryPublishedQuantityProducts));
            this.registerWarehouseMoving.warehouseStockProducts = (Number(stockProduct) - Number(this.inventoryPublished.inventoryPublishedQuantityProducts));
            this.registerWarehouseMoving.warehouseTotalProducts = (Number(totalProduct) - Number(this.inventoryPublished.inventoryPublishedQuantityProducts));

            console.log(this.registerWarehouseMoving);

             this.serviceInventoryDetails.postWarehouseNewPublishedSiteProducts(this.registerWarehouseMoving)
            .subscribe(
              data=>{
              console.log(data);
              this.serviceInventoryDetails.getProductInfoOnSelectedSite(this.inventoryPublished.idProduct.toString(), this.inventoryPublished.idSiteStore.toString())
              .subscribe(
               (data:ProductInventoryDetails[])=> {
                this.showProductDetails = data;
                console.log(this.showProductDetails)

                 },
                 error => console.log("opps product without inventory entry", error)
                 )

                 this.serviceInventoryDetails.getProductInfoOnSelectedSite(this.inventoryPublished.idProduct.toString(), this.inventoryPublished.idSiteStore.toString())
                 .subscribe((data:ProductSiteDetails[])=> {
                   this.showProductSiteDetails = data;
                   console.log(this.showProductSiteDetails)

                 })
             },
             error => console.log("opps product without inventory entry", error))

          }else{
            console.log("error product wihout entry")
            totalProduct = "0";
            stockProduct = "0";
            publishedProduct = "0";
          }
         })

      }

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
 getAllInventoryPublishedDetails() {
  this.serviceInventoryDetails.getAllInventoryPublishedSiteDetails(this.siteId).subscribe((data:InventoryInfoPublishedDetails[])=>{
    this.inventoryInfoPublishedDetailsList = data;
    console.log(this.inventoryInfoPublishedDetailsList);
    this.dataSource.data = this.inventoryInfoPublishedDetailsList;
    this.filterSelectObj.filter((o) => {
      o.options = this.getFilterObject(this.inventoryInfoPublishedDetailsList, o.columnProp);
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
