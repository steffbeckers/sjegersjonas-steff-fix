import {Action, createReducer, on} from '@ngrx/store';
import {LayoutState, initialLayoutState} from '../states/layout.state';
import * as layoutActions from '../actions/layout.actions';
import {toggleMobileNavbar} from "../actions/layout.actions";

export const layoutFeatureKey = 'layout';

const stateReducer = createReducer(initialLayoutState,
  on(
    layoutActions.toggleVerticalNavbar, (state) => ({
      ...state,
      isNavbarVerticalCollapsed: !state.isNavbarVerticalCollapsed
    })
  ),
  on(
    layoutActions.toggleMobileNavbar, (state) => ({
      ...state,
      isMobileNavbarCollapsed: !state.isMobileNavbarCollapsed
    })
  ),
  on(
    layoutActions.closeMobileNavbar, (state) => ({
      ...state,
      isMobileNavbarCollapsed: true
    })
  ),
  on(
    layoutActions.toggleThemeColor, (state, { isDarkMode }) => ({
      ...state,
      isDarkMode: isDarkMode
    })
  ),
);

export function reducer(state: LayoutState | undefined, action: Action): LayoutState {
  return stateReducer(state, action);
}
