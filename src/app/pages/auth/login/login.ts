import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Password } from 'primeng/password';

import { LoginForm } from '@/interfaces/user';
import { Loading } from '@/pages/loading/loading';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-login',
  providers: [MessageService],
  imports: [
    FormsModule,
    Password,
    AppFloatingConfigurator,
    CommonModule,
    InputTextModule,
    ButtonModule,
    RouterModule,
    CheckboxModule,
    ReactiveFormsModule,
    Message,
    Toast
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  login: FormGroup = new FormGroup<LoginForm>({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    remember: new FormControl(false)
  });

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    const remember = JSON.parse(localStorage.getItem('remember') || 'false');
    if (remember) {
      // Si existe el remember, carga email y password guardados
      const email = remember.email;

      this.login.setValue({
        email,
        password: '',
        remember: true
      });
    }
  }

  loginUser() {
    this.login.markAllAsDirty();
    this.login.updateValueAndValidity();

    if (!this.login.valid) return;

    //guardamos las credenciales
    if (this.login.get('remember')?.value) {
      localStorage.setItem('remember', JSON.stringify({ email: this.login.get('email')?.value }));
    } else localStorage.removeItem('remember');

    this.userService.authUser(this.login.value).subscribe({
      next: (user) => {
        this.authService.setUser(user.user);
        this.authService.setToken(user.accessToken);

        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Bienvenido ${user.user.name}`, life: 3000 });

        setTimeout(() => {
          if (user.user.rol_id != 6) this.router.navigate(['/pages/estadisticas_ventas']);
          else this.router.navigate(['/landing']);
        }, 2000);
      }
    });
  }
}
