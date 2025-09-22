import { Component, signal } from '@angular/core';
import { Password } from 'primeng/password';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    Password,
    AppFloatingConfigurator,
    CommonModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    CheckboxModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  checked1 = signal<boolean>(true);
}
