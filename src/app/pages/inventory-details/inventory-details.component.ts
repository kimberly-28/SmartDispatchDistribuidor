import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { InventoryService } from 'src/app/services/inventory/inventory.service';
import { WarehouseDetail } from 'src/app/interfaces/warehouse-details';
import { WarehouseDetailsGlobalInfo } from 'src/app/interfaces/warehouse-info-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-details.component.html',
  styleUrls: ['./inventory-details.component.css']
})
export class InventoryDetailsComponent implements OnInit {

  //Angular Material Table and Filter Function
  filterValues = {};
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Product Code','Product Name', 'Total Products', 'Stock Products' , 'Published Products', 'Moving Type'];
  filterSelectObj = [];

  warehouseInfoLst: WarehouseDetail[];
  //navigation parameter
  siteId;

  //Add paginator with angular material
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    }


  constructor(private serviceInventoryDetails: InventoryService,
              private activatedRoute: ActivatedRoute) {

    this.filterSelectObj = [
     {
        name: 'Moving Type',
        columnProp: 'warehouseMovingType',
        options: []
      }
    ]
}


  ngOnInit(): void {

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log("this is de id navigate ON WAREHOUSE")
    console.log(id);
    this.siteId = id;

    this.getAllSiteWarehouseDetails();

    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
  }

  getAllSiteWarehouseDetails(){
      this.serviceInventoryDetails.getSiteWarehouseDetails(this.siteId.toString())
      .subscribe((data:WarehouseDetail[])=>{
        this.warehouseInfoLst = data;
        this.dataSource.data = this.warehouseInfoLst;
        this.filterSelectObj.filter((o) => {
          o.options = this.getFilterObject(this.warehouseInfoLst, o.columnProp);
        });
      });
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
