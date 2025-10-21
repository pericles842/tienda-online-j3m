import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { Charges } from './crud/charges/charges';
import { Users } from './crud/users/users';
import { Profile } from './components/profile/profile';

//!LOS PATH SE TIENE QUE LLAMAR COMO LAS LLAVES DEL OBJETO MODULES
export default [
  { path: 'documentation', component: Documentation },
  { path: 'crud', component: Crud },
  { path: 'cargos', component: Charges },
  { path: 'usuarios', component: Users },
  { path: 'profile', component: Profile },
  { path: 'empty', component: Empty },
  { path: '**', redirectTo: '/notfound' }
] as Routes;
