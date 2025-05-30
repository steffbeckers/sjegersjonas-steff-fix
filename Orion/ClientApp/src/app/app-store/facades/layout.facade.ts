import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {LayoutState} from '../states/layout.state';
import * as layoutActions from '../actions/layout.actions';
import {Observable} from 'rxjs';
import * as layoutSelectors from '../selectors/layout.selectors';

@Injectable({
  providedIn: 'root'
})

export class LayoutFacade {

  selectIsNavbarVerticalCollapsed$: Observable<boolean> = this.store.select(layoutSelectors.getIsNavbarVerticalCollapsed);
  selectIsMobileNavbarCollapsed$: Observable<boolean> = this.store.select(layoutSelectors.getIsMobileNavbarCollapsed);
  selectIsDarkMode$: Observable<boolean> = this.store.select(layoutSelectors.getIsDarkMode);

  constructor(private store: Store<LayoutState>) { }

  toggleVerticalNavbar(): void {
    this.store.dispatch(layoutActions.toggleVerticalNavbar());
  }

  toggleMobileNavbar(): void {
    this.store.dispatch(layoutActions.toggleMobileNavbar());
  }

  closeMobileNavbar(): void {
    this.store.dispatch(layoutActions.closeMobileNavbar());
  }

  toggleThemeColor(isDarkMode: boolean): void {
    this.store.dispatch(layoutActions.toggleThemeColor({isDarkMode}));
  }
}
