import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { AppMenuBar } from '../app-menu-bar/app-menu-bar';
import { FormUser } from '../form-user/form-user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateUserTypeClient } from '@/interfaces/user';
import { passwordMatchValidator } from '@/pages/auth/register/register';
import { AuthService } from '@/services/auth.service';
import { UserService } from '@/services/user.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  imports: [AppMenuBar, FormUser],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile {
  @ViewChild('formUser') FormUser!: FormUser;
  registerForm = new FormGroup<CreateUserTypeClient>(
    {
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      ci: new FormControl('', [Validators.required, Validators.minLength(7)]),
      phone: new FormControl('', [Validators.required]),
      phone_2: new FormControl(''),
      age: new FormControl('', [Validators.required]),
      public_group_id: new FormControl(''),
      rol_id: new FormControl('', [Validators.required]),
      state_id: new FormControl('', [Validators.required]),
      city_id: new FormControl('', [Validators.required]),
      parish_id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    },
    { validators: passwordMatchValidator }
  );
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
  ) {}

  ngAfterViewInit() {
    //?forzamos los cambios del componente debido a que FormUser esta dentro del modal
    this.cdr.detectChanges();

    let user = this.authService.decodeToken().user;
    this.userService.getUser(user.id).subscribe((user) => {
      //forzamos los cambios del render
      this.cdr.detectChanges();
      //verificamos que form user exista
      if (this.FormUser) {
        this.FormUser.getCities(user.state_id);
        this.FormUser.getParishes(user.city_id);
      }

      this.registerForm.get('rol_id')?.setValue(user.rol_id);
      this.registerForm.get('password_confirmation')?.setValue(user.password);

      this.registerForm.patchValue(user);
    });
  }

  saveProfile() {
    this.registerForm.markAllAsDirty();
    this.registerForm.updateValueAndValidity();

    if (!this.registerForm.valid) return;

    this.userService.editClient(this.registerForm.value).subscribe((user) => {
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Perfil actualizado exitosamente' });
      this.registerForm.get('password_confirmation')?.setValue(user.password);

      //actualizamos el user del localstorage
      let beforeUserLocalStorage = JSON.parse(localStorage.getItem('user')!);
      beforeUserLocalStorage.email = user.email;
      beforeUserLocalStorage.last_name = user.last_name;
      beforeUserLocalStorage.name = user.name;
      beforeUserLocalStorage.rol_id = user.name;
      beforeUserLocalStorage.role = user.role;

      localStorage.setItem('user', JSON.stringify(beforeUserLocalStorage));
      this.registerForm.patchValue(user);
    });
  }
}
