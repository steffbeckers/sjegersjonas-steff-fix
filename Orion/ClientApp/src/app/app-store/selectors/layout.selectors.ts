import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LayoutState} from '../states/layout.state';

const layoutState = createFeatureSelector<LayoutState>('layout');

export const getIsNavbarVerticalCollapsed = createSelector(
  layoutState,
  (state: LayoutState) => {
    return state.isNavbarVerticalCollapsed;
  }
);

export const getIsMobileNavbarCollapsed = createSelector(
  layoutState,
  (state: LayoutState) => {
    return state.isMobileNavbarCollapsed;
  }
);

export const getIsDarkMode = createSelector(
  layoutState,
  (state: LayoutState) => {
    return state.isDarkMode;
  }
);
