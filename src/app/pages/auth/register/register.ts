import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AppFloatingConfigurator } from "@/layout/component/app.floatingconfigurator";
import { Password } from "primeng/password";

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ButtonModule, CheckboxModule, InputTextModule, AppFloatingConfigurator, Password],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class RegisterComponent {
  checked1 = signal<boolean>(true);
}
