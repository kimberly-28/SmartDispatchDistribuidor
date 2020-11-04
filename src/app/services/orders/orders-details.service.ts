import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OrdersDetails } from 'src/app/interfaces/orders-details';
import { Observable, Subject } from 'rxjs';
import { SelectedAgentsInStateModel } from 'src/app/models/selected-agents-in-state-models';
import { AssignedOrderToEmployee } from 'src/app/models/assigned-order-emp.models';

@Injectable({
  providedIn: 'root'
})
export class OrdersDetailsService {

  url = 'https://domappssuiteservices.com/SmartControl2020/WebAdminWebServices/';
  constructor(private http: HttpClient) { }


  getOrdersDetails(){
    return this.http.get<OrdersDetails[]>(`${this.url}GetOrdersDetails.php`);
  }


  updateOrderChecked(orderChecked: OrdersDetails) : Observable<any>{
    //ResponseType Text because We don´t need read an json call back and angular by default wait that
    return this.http.put(`${this.url}PutOrdersChecked.php`, orderChecked ,  {responseType: 'text'});
  }

  getAgentsInThatStates(state: string){
    let params1 = new HttpParams().set('state', state);
    return this.http.get<SelectedAgentsInStateModel[]>(`${this.url}GetAgentsInStates.php`,{params: params1})
  }

  postOrdersAgentAssigned(assignedTo: AssignedOrderToEmployee){
      return this.http.post(`${this.url}PostOrderAgentAssigned.php`, assignedTo,  {responseType: 'text'} );
  }

  postOrderAssignamentRoutesEmployee(assignedTo: AssignedOrderToEmployee){
    return this.http.post(`${this.url}PostOrderAssignamentRoutesEmployee.php`, assignedTo,  {responseType: 'text'} );
}

}



