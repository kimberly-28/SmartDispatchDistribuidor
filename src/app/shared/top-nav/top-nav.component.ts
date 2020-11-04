import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/services/sidenav/nav.service';
import { SitesService } from 'src/app/services/sites/sites.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  loginbtn:boolean;
  logoutbtn:boolean;

  constructor(public navService: NavService,
              private siteService: SitesService,
              private router:Router) {
                siteService.getLoggedInName.subscribe(name => this.changeName(name));
      if(this.siteService.isLoggedIn()){
        console.log("loggedin");
        this.loginbtn=false;
        this.logoutbtn=true
      }
       else{
      this.loginbtn=true;
      this.logoutbtn=false
        }
      }
  ngOnInit(): void {

  }

      private changeName(name: boolean): void {
      this.logoutbtn = name;
      this.loginbtn = !name;
      }
      logout()
      {
      this.siteService.deleteToken();
      window.location.href = window.location.href;
      const redirect = this.siteService.redirectUrl ? this.siteService.redirectUrl: '/login';
      this.router.navigate([redirect]);
      }
}
