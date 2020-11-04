import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryDetails } from '../../interfaces/country-details';
import { GlobalDetailsService } from '../../services/global/global-details.service';

@Component({
  selector: 'app-global-details',
  templateUrl: './global-details.component.html',
  styleUrls: ['./global-details.component.css']
})
export class GlobalDetailsComponent implements OnInit {

  title = 'Global View';
  lat = 19.3581748;
  lon = -99.3861982;

  countryDetails: CountryDetails[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private serviceGlobalView: GlobalDetailsService) { }

  ngOnInit(): void {
    this.getAllInfo();
  }

  getAllInfo(){
    this.serviceGlobalView.getGlobalDetails().subscribe((data: CountryDetails[])=>{
      this.countryDetails = data;
      console.log(this.countryDetails);
    })
  }



}
