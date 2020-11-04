import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductDetails } from 'src/app/interfaces/products-details';
import { ProductsService } from 'src/app/services/products/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css']
})
export class ProductsDetailsComponent implements OnInit {

  //Angular Material Table and Filter Function
  filterValues = {};
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Code','Category', 'Brand', 'Name' , 'Desc', 'Unit', 'CostUnit', 'Price'];
  filterSelectObj = [];
  productsDetailsLst : ProductDetails[];
  //Inventory Published Model
  productRegister: ProductModel = new ProductModel();
  //Form
  formProductRegister: FormGroup;
  //navigation parameter
  siteId;

   //Add paginator with angular material
 @ViewChild(MatPaginator) paginator: MatPaginator;

 ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;

  }


  constructor(private activatedRoute: ActivatedRoute,
              private serviceProductDetails: ProductsService) {

    this.filterSelectObj = [
      {
        name: 'Category',
        columnProp: 'productCategory',
        options: []
      }, {
        name: 'Brand',
        columnProp: 'productBrand',
        options: []
      }
    ]
   }

  ngOnInit(): void {


    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log("this is de id navigate ON PRODUCTS")
    console.log(id);
    this.siteId = id;

    this.getAllSiteProductDetails();

    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
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


  getAllSiteProductDetails(){
      //test get php mysql agent per state
      this.serviceProductDetails.getAllSiteProductsDetails(this.siteId.toString())
      .subscribe ((data: ProductDetails[]) => {
             this.productsDetailsLst = data;
             console.log(this.productsDetailsLst)
             this.dataSource.data = this.productsDetailsLst;
             this.filterSelectObj.filter((o) => {
               o.options = this.getFilterObject(this.productsDetailsLst, o.columnProp);
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
