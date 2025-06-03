import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'relations',
    loadChildren: () =>
      import('./relations/relations.routes').then((m) => m.routes),
  },
];
