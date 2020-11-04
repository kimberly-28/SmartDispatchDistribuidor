import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersDetails } from '../../interfaces/orders-details';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersDetailsService } from '../../services/orders/orders-details.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';


@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css']
})
export class OrdersDetailsComponent implements OnInit{

  //Object Orders from db request
  orderDetails: OrdersDetails[];
  //Angular Material Table and Filter Function
  filterValues = {};
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['Check','Order Number', 'State', 'Employee' , 'Contact Number', 'Status', 'Products', 'Location', 'Start Date', 'Delivered Date'];
  filterSelectObj = [];
  //List Orders Selected
  ordersList = [];

  //Add paginator with angular material
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('input') private checkInput;

  // we need know about the life cycle components in angular
  //ngAfterViewInit : A lifecycle hook that is called after Angular has fully initialized a component's
  // view. Define an ngAfterViewInit() method to handle any additional initialization tasks.
  // in this case, we need to implement the pagination after the data Source is charged in the table
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    }

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private serviceOrdersDetail: OrdersDetailsService,
               //Create Dialog for Order assignament
              private dialogOrderAssign: MatDialog) {
    // Object to create Filter for the colummnprop in with the reference orders.orderStatus and so on
    this.filterSelectObj = [
      {
        name: 'Order Status',
        columnProp: 'orderStatus',
        options: []
      }, {
        name: 'State',
        columnProp: 'orderState',
        options: []
      }
    ]
  }




  ngOnInit(): void {

    //Update the ngOnInit() method to access the ActivatedRoute and track the id parameter:
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log("this is de id navigate")
    console.log(id);


    //test angular material tables
    this.getAllOrder();
      // Overrride default filter behaviour of Material Datatable

    this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.paginator = this.paginator;
  }

  getOnSelectedOrder(selectedOrder){
    console.log(selectedOrder)
  }

  showChecked(reviewCheck, orderSelected){
    console.log(reviewCheck.checked); //true or false
    console.log(reviewCheck.checked? "it's checked": "it's not checked")
    reviewCheck.checked? this.addToTheListOrderSelected(orderSelected): this.removeToTheListOrderSelected(orderSelected);
   }

   addToTheListOrderSelected(orderSelected: OrdersDetails){
     console.log("Add element to the list ")
     console.log(orderSelected)

     orderSelected.orderChecked = 1;
     //update to database
     this.serviceOrdersDetail.updateOrderChecked(orderSelected)
      .subscribe((data:OrdersDetails)=>{
        orderSelected = data
      })

     this.ordersList.push(orderSelected);
     console.log(this.ordersList);
   }

   removeToTheListOrderSelected(orderSelected : OrdersDetails){
    console.log("Remove element to the list ")
    console.log(orderSelected);
    //update to database
    orderSelected.orderChecked = 0;
    this.serviceOrdersDetail.updateOrderChecked(orderSelected)
    .subscribe((data:OrdersDetails)=>{
      orderSelected = data
    })
    //Remove by index also no repit element in a list for duplex delete find by index in the array
    const foundIndex = this.ordersList.findIndex(({ orderNumber }) => orderNumber === orderSelected.orderNumber);
    this.ordersList = this.ordersList.filter((_, index) => index !== foundIndex);
    console.log(this.ordersList);

   }

   orderAssignment(){
    console.log(this.ordersList);
    const dialogRef = this.dialogOrderAssign.open(OrderDialogComponent, { data : this.ordersList });
  /*   dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */


    dialogRef.afterClosed().subscribe(()=>{return this.serviceOrdersDetail.getOrdersDetails().subscribe((data: OrdersDetails[]) => {
      this.orderDetails = data;
      this.dataSource.data = this.orderDetails;
      console.log(this.orderDetails);
      console.log(this.dataSource);
      this.ordersList = [];
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(this.orderDetails, o.columnProp);
      });
    });});



   }

   checkOrderSelected(){

   }

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
  getAllOrder() {
    this.serviceOrdersDetail.getOrdersDetails().subscribe((data: OrdersDetails[])=>{
      this.orderDetails = data;
      this.dataSource.data = this.orderDetails;
      console.log(this.orderDetails);
      console.log(this.dataSource);
      this.filterSelectObj.filter((o) => {
        o.options = this.getFilterObject(this.orderDetails, o.columnProp);
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
