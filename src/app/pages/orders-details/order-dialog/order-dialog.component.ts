import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrdersDetails } from 'src/app/interfaces/orders-details';
import { OrdersDetailsService } from 'src/app/services/orders/orders-details.service';
import { OrderModel } from 'src/app/models/orders.models';
import { SelectedAgentsInStateModel } from 'src/app/models/selected-agents-in-state-models';
import { AssignedOrderToEmployee } from 'src/app/models/assigned-order-emp.models';


@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  //Object Orders from db request
  orderDetails: OrdersDetails[];
  //List for States disctincs in the order selectes
  result = [];
   //Employees List
  employee:SelectedAgentsInStateModel[];
  //Send post assigned order To employee per ID
  assignedOrderToEmployee = new AssignedOrderToEmployee();


  constructor(
    //Service
    private serviceOrdersDetail: OrdersDetailsService,
    //For call dialog ref
    public dialogRef: MatDialogRef<OrderDialogComponent>,
    //Read data in the dialog
    @Inject(MAT_DIALOG_DATA) public data:OrdersDetails[]) {
    }


  ngOnInit(): void {

    console.log("Data from the dialog");
    console.log(this.data);
    //set data order Details List
    this.orderDetails = this.data;
    //get the distinct state in the orders selected
    const map = new Map();
    for (const item of this.orderDetails) {
        if(!map.has(item.orderState)){
            map.set(item.orderState, true);    // set any value to Map
            this.result.push({
                orderNumber: item.orderNumber,
                stateSelected: item.orderState,
            });
        }
    }
    console.log(this.result)
  }

  saveInformatio(){
    console.log("save info");
    this.dialogRef.close("IT WAS SAVED")
  }

  assignAll(){
    console.log("assign this")
    const foundIndex = this.result.findIndex(({ statesSelected }) => statesSelected);
    console.log(foundIndex);

  }

  selectActivated(order: OrdersDetails){

    //var employee:SelectedAgentsInStateModel[];

     //test get php mysql agent per state
     this.serviceOrdersDetail.getAgentsInThatStates(order.orderState)
     .subscribe ((data: SelectedAgentsInStateModel[]) => {
            this.employee = data;
            }
     )
    console.log(order);
  }

  sendAssignation(order: OrdersDetails){

    this.assignedOrderToEmployee.orderId = order.orderNumber;
    this.assignedOrderToEmployee.employeeId = order.orderOnEmployee;
    console.log(this.assignedOrderToEmployee);

    this.serviceOrdersDetail.postOrdersAgentAssigned(this.assignedOrderToEmployee)
    .subscribe(data=>{
          console.log(data);
    })
    this.serviceOrdersDetail.postOrderAssignamentRoutesEmployee(this.assignedOrderToEmployee)
    .subscribe(data=>{
          console.log(data);
    })

  }

  //Test select save the value selected

  modifiedText:string;
  empSelected: any = {};

  onEmployeeSelected(order:OrdersDetails){
    this.customFunction(order);

  }

  customFunction(val:OrdersDetails){
    this.modifiedText= "The Value" + val.orderOnEmployee + "was selected " + val.orderContent;
    console.log(val)

  }

}
