import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    PasswordModule,
    SelectModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    AppFloatingConfigurator
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  checked1 = signal<boolean>(true);

  cities = [
    { name: 'Caja de ahorro 1', code: 'NY' },
    { name: 'Caja de ahorro 2', code: 'RM' },
    { name: 'Caja de ahorro 3', code: 'LDN' },
    { name: 'Caja de ahorro 4', code: 'IST' },
    { name: 'Caja de ahorro 5', code: 'PRS' }
  ];
}
