import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);

  //Subject for get the user login params
  userParams = new Subject<number>();
  userParams$ = this.userParams.asObservable();
  idUserParam;
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  sendUserParams(userParams: number){
    console.log("in the service");
    console.log(userParams);
    this.idUserParam = userParams;
    this.userParams.next(userParams);
  }

  getUserParams(){
    return this.idUserParam;
  }

  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }
}
