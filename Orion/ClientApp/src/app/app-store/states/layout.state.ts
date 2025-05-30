export interface LayoutState {
  isNavbarVerticalCollapsed: boolean;
  isMobileNavbarCollapsed: boolean;
  isDarkMode: boolean;
}

export const initialLayoutState: LayoutState = {
  isNavbarVerticalCollapsed: false,
  isMobileNavbarCollapsed: true,
  isDarkMode: true
};
