import { Component, OnInit } from '@angular/core';
import {RoutesConfig} from "../../routes-config";
import {LayoutFacade} from "../../../app-store/facades/layout.facade";
import {first, Observable} from "rxjs";

@Component({
  selector: 'app-main-navbar',
  templateUrl: './main-navbar.component.html',
  styleUrls: ['./main-navbar.component.scss']
})
export class MainNavbarComponent implements OnInit {

  routesConfig = RoutesConfig
  isDarkMode$: Observable<boolean>;

  constructor(private layoutFacade: LayoutFacade) {
    this.isDarkMode$ = this.layoutFacade.selectIsDarkMode$;
  }

  ngOnInit(): void {

  }

  onToggleThemeColor(isDarkMode: boolean) {
    this.layoutFacade.toggleThemeColor(isDarkMode);
  }

  onToggleMobileNavbar() {
    this.layoutFacade.toggleMobileNavbar();
  }

}
