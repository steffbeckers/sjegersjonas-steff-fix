import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, RouterEvent} from "@angular/router";
import {filter, first, Observable, tap} from "rxjs";
import {RoutesConfig} from "../../routes-config";
import {LayoutFacade} from "../../../app-store/facades/layout.facade";

interface NavigationItem {
  type: number;
  link?: string;
  icon: string;
  text: string;
  isCollapsed?: boolean
  level?: NavigationItemLevel[];
  section?: Section;
}
interface NavigationItemLevel {
  link: string;
  text: string;
}

interface Section {
  text: string;
}

enum NavigationItemType {
  Single = 0,
  Multi = 1
}

@Component({
    selector: 'app-main-sidebar',
    templateUrl: './main-sidebar.component.html',
    styleUrls: ['./main-sidebar.component.scss'],
    standalone: false
})
export class MainSidebarComponent implements OnInit {

  navigationItemType = NavigationItemType;
  isCollapsed = true;
  isMobileNavbarCollapsed = false;

  navigationItems: NavigationItem[]= [
    {
      type: NavigationItemType.Single,
      link: RoutesConfig.root,
      icon: 'fa-solid fa-gauge',
      text: 'Dashboard'
    },
    {
      type: NavigationItemType.Single,
      link: RoutesConfig.quotation.quotationList.fullPath,
      icon: 'fa-regular fa-paper-plane',
      text: 'Quotas'
    },
    {
      type: NavigationItemType.Single,
      link: RoutesConfig.product.productList.fullPath,
      icon: 'fa-solid fa-boxes-stacked',
      text: 'Products'
    },
    {
      type: NavigationItemType.Single,
      link: RoutesConfig.relation.relationList.fullPath,
      icon: 'fa-solid fa-user-group',
      text: 'Relations'
    },
    {
      type: NavigationItemType.Multi,
      icon: 'fa-solid fa-gear',
      text: 'Settings',
      isCollapsed: true,
      level: [
        { link: RoutesConfig.settings.landing.fullPath, text: 'All Settings' },
        { link: RoutesConfig.settings.vatSettings.fullPath, text: 'VAT Percentages' },
        { link: RoutesConfig.settings.productCategory.fullPath, text: 'Product Categories' },
        { link: RoutesConfig.settings.productUnit.fullPath, text: 'Product Units' }
      ],
      section: { text: 'Settings' }
    },
  ];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private layoutFacade: LayoutFacade) {

  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      first()
    ).subscribe((event: any) => {
      this.openActivatedNavigationLevel(event.url)
    })
    this.layoutFacade.selectIsMobileNavbarCollapsed$.subscribe(collapsed => this.isMobileNavbarCollapsed = collapsed);
  }

  openActivatedNavigationLevel(link: string) {
    this.navigationItems
      .filter(navigationItem => navigationItem.type === NavigationItemType.Multi)
      .forEach(navigationItem => {
        navigationItem.level?.forEach(level => {
          if(level.link === link) {
            navigationItem.isCollapsed = false;
          }
        })
    })
  }

  onToggleVerticalNavbar() {
    this.layoutFacade.toggleVerticalNavbar();
  }

  onCloseMobileNavigation() {
    this.layoutFacade.closeMobileNavbar();
  }

}
