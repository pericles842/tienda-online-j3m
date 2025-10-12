import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Charges } from './crud/charges/charges';

export default [
  { path: 'documentation', component: Documentation },
  { path: 'crud', component: Crud },
  { path: 'cargos', component: Charges },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
