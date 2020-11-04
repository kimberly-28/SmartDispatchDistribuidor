import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { SitesService } from '../services/sites/sites.service';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { SiteUserRegister } from '../models/site-user-register.models';
import { NavService } from '../services/sidenav/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  idNav : number;
  angForm: FormGroup;
  constructor(private fb: FormBuilder,
              private serviceSites: SitesService,
              private navService: NavService,
              private router:Router) {

  this.angForm = this.fb.group({
  email: ['', [Validators.required,Validators.minLength(1), Validators.email]],
  password: ['', Validators.required]
  });
  }

  ngOnInit() {
  }

  goRegister(){
    this.router.navigate(['/register']);
  }
  postdata(angForm1)
  {
  this.serviceSites.userlogin(angForm1.value.email,angForm1.value.password)
  .subscribe(data  => {
      let navigateParameter = data[0].siteStoreId
      this.idNav = navigateParameter;
      console.log("data check");
      console.log(data[0].siteStoreId);
      alert("Correct")
      console.log(data);
      const redirect = this.serviceSites.redirectUrl ? this.serviceSites.redirectUrl: '/inventorydetails/';
      console.log(redirect);

      //Method for interaction with navService for share data on that component
      this.navService.sendUserParams(this.idNav);

      console.log( this.router.navigate([redirect , { id : navigateParameter}] ));
      this.router.navigate([redirect , navigateParameter] );
  },
  error => {
  alert("User name or password is incorrect")
  });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

}
