import { Component, signal, WritableSignal } from '@angular/core';
import { Password } from 'primeng/password';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { LoginForm } from '@/interfaces/user';
import { Message } from 'primeng/message';
import { UserService } from '@/services/user.service';
import { Loading } from '@/pages/loading/loading';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '@/services/auth.service';

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
    Loading,
    Toast
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loading: WritableSignal<boolean> = signal(false);

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

    this.loading.set(true);
    this.userService.authUser(this.login.value).subscribe({
      next: (user) => {
        this.authService.setUser(user.user);
        this.authService.setToken(user.accessToken);
      
        this.loading.set(false);

        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Bienvenido ${user.user.name}`, life: 3000 });

        setTimeout(() => {
          if (user.user.rol_id != 6) this.router.navigate(['/dashboard']);
          else this.router.navigate(['/landing']);
        }, 2000);
      },
      error: (error) => {
        this.loading.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error, life: 5000 });
      }
    });
  }
}
