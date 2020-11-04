import { Component, OnInit } from '@angular/core';
import { StateDetails } from 'src/app/interfaces/states.details';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/services/state/state.service';

export interface Tile {
  completed: string;
  inProgress: string;
  deliveryName: string;
  delayed: string;
  deliveryNum: string;
 }

@Component({
  selector: 'app-states-details',
  templateUrl: './states-details.component.html',
  styleUrls: ['./states-details.component.css']
})
export class StatesDetailsComponent implements OnInit {

  tiles: Tile [] = [
    {deliveryName: 'Pedro', deliveryNum: '34',completed: '14%' , inProgress: '30%', delayed: '12%'},
    {deliveryName: 'juan', deliveryNum: '44',completed: '55%' , inProgress: '30%', delayed: '12%'},
    {deliveryName: 'luis', deliveryNum: '11',completed: '29%' , inProgress: '30%', delayed: '12%'},
    {deliveryName: 'Delivery 4', deliveryNum: '10',completed: '45%' , inProgress: '30%', delayed: '12%'},
    {deliveryName: 'Delivery 5', deliveryNum: '66',completed: '39%' , inProgress: '30%', delayed: '12%'},
    ];

    stateDetails: StateDetails[];
    constructor(private route: ActivatedRoute,
                private router: Router,
                private serviceStateDetail: StateService) { }

    ngOnInit(): void {
      this.getAllInfo();
    }

    getAllInfo(){
      this.serviceStateDetail.getStateDetails().subscribe((data: StateDetails[])=>{
        this.stateDetails = data;
        console.log(this.stateDetails);
      })
    }

  }

