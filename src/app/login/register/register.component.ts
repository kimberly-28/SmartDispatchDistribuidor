import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteUserRegister } from 'src/app/models/site-user-register.models';
import { SitesService } from 'src/app/services/sites/sites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //Inventory Published Model
  userSiteRegister: SiteUserRegister = new SiteUserRegister();
  //Form
  formSiteRegister: FormGroup;
  constructor(private fb: FormBuilder,
              private serviceSites: SitesService,
              private router:Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  goLogin(){
    this.router.navigate(['/login']);
  }


  createForm(){
    this.formSiteRegister = this.fb.group({
    //property:  [content form default, [validatorArray sync need All] , validator async]
    idState      : ['', Validators.required],
    siteStoreLocation      : ['', Validators.required],
    siteStoreName  : ['', Validators.required],
    siteStoreManager     : ['', Validators.required],
    siteStoreUserName      : ['', Validators.required],
    siteStoreUserPassword      : ['', Validators.required],
    siteStoreUserEmail  : ['', Validators.required]
    });
  }


  shareSiteRegistered(){
    console.log(this.userSiteRegister);
    this.serviceSites.postRegisterSite(this.userSiteRegister)
    .subscribe(data=>{
      console.log(data);
      const redirect = this.serviceSites.redirectUrl ? this.serviceSites.redirectUrl: '/login';
      this.router.navigate([redirect]);
      console.log("User register")
    })
  }


}
