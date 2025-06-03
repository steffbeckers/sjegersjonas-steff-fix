import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./relations.component').then((m) => m.RelationsComponent),
  },
];
