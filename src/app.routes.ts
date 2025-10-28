import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';

import { AuthGuard } from '@/guards/auth-guard';

import { Landing } from '@/pages/landing/landing-page/landing';
import { WebShop } from '@/pages/landing/web-shop/web-shop';
import { Notfound } from './app/pages/notfound/notfound';
import { ProductDetailComponent } from '@/pages/landing/components/product-detail/product-detail';
import { ShopProducts } from '@/pages/landing/components/shop-products/shop-products';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  {
    path: '',
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'documentation', component: Documentation },
      { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') }
    ]
  },
  { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
  {
    path: '',
    component: WebShop,
    children: [
      { path: 'landing', component: Landing },
      { path: 'shop', component: ShopProducts },
      { path: 'product/:id', component: ProductDetailComponent }
    ]
  },
  { path: 'notfound', component: Notfound },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' }
];
