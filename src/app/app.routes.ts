import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home').then(m => m.Home) },
  { path: ':category/:subcategory/:slug', loadComponent: () => import('./product/product').then(m => m.Product) },
  { path: 'favorites-list', loadComponent: () => import('./favorites-list/favorites-list').then(m => m.FavoritesList) },
  { path: 'shopping-list', loadComponent: () => import('./shopping-list/shopping-list').then(m => m.ShoppingList) },
  { path: 'contact-us', loadComponent: () => import('./contact-us/contact-us').then(m => m.ContactUs) },
  { path: '**', redirectTo: '' }
];
