import {Component, OnInit, Renderer2} from '@angular/core';
import {LayoutFacade} from "./app-store/facades/layout.facade";
import {Observable} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit{

  isNavbarVerticalCollapsed$: Observable<boolean>;

  constructor(private layoutFacade: LayoutFacade, private renderer: Renderer2) {
    this.isNavbarVerticalCollapsed$ = this.layoutFacade.selectIsNavbarVerticalCollapsed$;
  }

  ngOnInit(): void {
  }

}
