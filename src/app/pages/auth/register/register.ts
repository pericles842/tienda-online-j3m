import { Municipality, Parish, State } from '@/interfaces/cities';
import { PublicGroup } from '@/interfaces/groups';
import { CreateUserTypeClient } from '@/interfaces/user';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { PublicGroupsService } from '@/services/groups.service';
import { StatesService } from '@/services/states.service';
import { CommonModule } from '@angular/common';
import { Component, WritableSignal, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { Loading } from '@/pages/loading/loading';
import { UserService } from '@/services/user.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormUser } from '@/pages/components/form-user/form-user';

/**
 *  Se encarca de validar las dos contraseas
 * @param control
 * @returns
 */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const password_confirmation = control.get('password_confirmation')?.value;

  if (password && password_confirmation && password !== password_confirmation) {
    return { passwordMismatch: true };
  }
  return null;
};

@Component({
  selector: 'app-register',
  providers: [MessageService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    PasswordModule,
    SelectModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    AppFloatingConfigurator,
    RouterModule,
    ToastModule,
    FormUser
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {}
