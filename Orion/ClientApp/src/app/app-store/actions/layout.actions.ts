import {createAction, props} from '@ngrx/store';

export const toggleVerticalNavbar = createAction('[Layout] Toggle Vertical Navbar');
export const toggleMobileNavbar = createAction('[Layout] Toggle Mobile Navbar');
export const closeMobileNavbar = createAction('[Layout] Close Mobile Navbar');
export const toggleThemeColor = createAction('[Layout] Toggle Theme Color', props<{ isDarkMode: boolean }>());
