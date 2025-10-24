import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { AuthGuard } from '@/guards/auth-guard';

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
  { path: 'landing', component: Landing },
  { path: 'notfound', component: Notfound },
  { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
  { path: '**', redirectTo: '/notfound' }
];
