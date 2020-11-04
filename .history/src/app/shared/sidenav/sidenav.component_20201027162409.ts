import { Component, OnInit, ChangeDetectorRef, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, VERSION, AfterViewInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavItem } from 'src/app/interfaces/nav-item';
import { NavService } from 'src/app/services/sidenav/nav.service';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../../login/login.component'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SidenavComponent implements OnInit, AfterViewInit {
  mobileQuery: MediaQueryList;
  idNav: number;
  id: number;
  private sub: any;
  private idUserParam: string;
  soTesting;
  navItems: NavItem[];

  @ViewChild('appDrawer') appDrawer: ElementRef;
  version = VERSION;

  constructor(private navService: NavService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(){
    console.log("params sidenav component")
    this.idUserParam = this.navService.getUserParams();
    console.log(this.idUserParam);

    this.navItems =[
    {displayName:'Dashboard', route:'',iconName:'home'},
    {displayName:'Products', route:'productsdetails/' + this.idUserParam', iconName:'list_alt'},
    {displayName:'Warehouse Moving',  route:'inventorydetails/' + this.idUserParam, iconName:'list_alt'},
    {displayName:'Inventory Published',  route:'inventorypublisheddetails/' + this.idUserParam, iconName:'list_alt'},
    {displayName:'Inventory Entry',  route:'inventoryentrydetails/' + this.idUserParam, iconName:'list_alt'},

    {displayName:'Employees', route:'employeedetails/' + this.idUserParam, iconName:'list_alt'},
    
    {displayName:'My Products', route:'productsdetails/' + this.idUserParam,iconName:'list_alt'}


     /* { path: "inventorypublisheddetails", component: InventoryPublishedDetailsComponent },
        { path: "inventorypublishedwebstoredetails", component: InventoryPublishedWebstoreDetailsComponent }, */

    ]

  }

  ngAfterViewInit() {

    this.navService.appDrawer = this.appDrawer;
  }
}
