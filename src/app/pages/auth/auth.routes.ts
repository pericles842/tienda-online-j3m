import { Routes } from '@angular/router';
import { Access } from './access';
import { Error } from './error';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './register/register';

export default [
  { path: 'access', component: Access },
  { path: 'error', component: Error },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
] as Routes;
