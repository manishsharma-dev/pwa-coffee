import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full' // Redirect to 'list' when the path is empty
  },
  {
    path: 'list',
    loadComponent: () => import('./list/list').then(m => m.List)
  },
  {
    path: 'coffee',
    loadComponent: () => import('./coffee/coffee').then(m => m.CoffeeComponent)
  },
  {
    path : "coffee/:id",
    loadComponent: () => import('./coffee/coffee').then(m => m.CoffeeComponent)
  }
];
