import { Column } from '@/interfaces/forms';
import { CreateUserTypeClient, User } from '@/interfaces/user';
import { passwordMatchValidator } from '@/pages/auth/register/register';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicTable } from '@/pages/components/dynamic-table/dynamic-table';
import { FormUser } from '@/pages/components/form-user/form-user';
import { UserService } from '@/services/user.service';
import { ChangeDetectorRef, Component, Input, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AppMenuBar, DynamicTable, DialogModule, FormUser, Button, TableModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
  @ViewChild('formUser') FormUser!: FormUser;
  users: WritableSignal<User[]> = signal<User[]>([]);
  selectedEliminateUsers: User[] = [];
  modal: WritableSignal<boolean> = signal<boolean>(false);
  globalFilterFields: string[] = ['name', 'email', 'role', 'phone', 'ci'];
  columns: Column[] = [
    {
      sortTable: true,
      key: 'name',
      label: 'Nombre'
    },
    {
      sortTable: true,
      key: 'email',
      label: 'Correo'
    },
    {
      sortTable: true,
      key: 'role',
      label: 'Cargo'
    },
    {
      sortTable: true,
      key: 'phone',
      label: 'Teléfono'
    },
    {
      sortTable: true,
      key: 'ci',
      label: 'Cédula'
    },
    {
      sortTable: true,
      dataType: 'date',
      key: 'created_at',
      label: 'Fecha de Registro'
    }
  ];

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
      public_group_id: new FormControl('', [Validators.required]),
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
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.userService.listUsers().subscribe((users) => {
      this.users.set(users);
    });
  }

  ngAfterViewInit() {
    //?forzamos los cambios del componente debido a que FormUser esta dentro del modal
    this.cdr.detectChanges();
  }

  guardar(): void {
    this.registerForm.markAllAsDirty();
    this.registerForm.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.registerForm.valid) return;

    const user = this.registerForm.value;
    if (this.registerForm.get('id')?.value == 0 || this.registerForm.get('id')?.value == null) {
      this.saveUserServiceProcess(user);
    } else this.updateUserServiceProcess(user);
  }

  /**
   *Despliega el modal
   *
   * @memberof Users
   */
  openModal() {
    this.registerForm.reset();
    this.modal.set(true);
  }

  /**
   *llama al servicio de guardado
   *
   * @memberof Users
   */
  saveUserServiceProcess(user: User) {
    this.userService.createUser(user).subscribe({
      next: (user) => {
        this.users.update((current) => [...current, user]);
        this.modal.set(false);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado exitosamente' });
      }
    });
  }

  /**
   *Contiene la suscripcion para elminiar un usuario del sistema
   *
   * @param {number} id
   * @memberof Users
   */
  deleteUserServiceProcess(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (user) => {
        this.users.update((current) => current.filter((item) => item.id !== id));
        this.modal.set(false);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario eliminado exitosamente' });
      }
    });
  }

  /**
   *Se encaraga de eliminar un usuario directamente de la tabla
   *
   * @param {User} user
   * @memberof Users
   */
  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar este usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteUserServiceProcess(user.id);
      }
    });
  }
  /**
   *Actualiza un usuario
   *
   * @param {User} user
   * @memberof Users
   */
  updateUserServiceProcess(user: User) {
    this.userService.updateUser(user).subscribe({
      next: (user) => {
        this.users.update((current) => current.map((item) => (item.id === user.id ? user : item)));
        this.modal.set(false);
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario editado exitosamente' });
      }
    });
  }
  /**
   *Configura los datos par editar
   *
   * @param {User} user
   * @memberof Users
   */
  goToEdit(user: User) {
    this.openModal();

    //forzamos los cambios del render
    this.cdr.detectChanges();

    //verificamos que form user exista
    if (this.FormUser) {
      this.FormUser.getCities(user.state_id);
      this.FormUser.getParishes(user.city_id);
    }

    this.registerForm.patchValue({ ...user, password_confirmation: user.password });
  }

  deleteUserMultiple() {
    this.confirmationService.confirm({
      message: `¿Estas seguro de eliminar estos ${this.selectedEliminateUsers.length} usuarios?`,
      header: 'Eliminar Usuarios',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids = this.selectedEliminateUsers.map((item) => item.id);
        this.userService.deleteGroupUsers(ids).subscribe({
          next: (users) => {
            this.users.update((current) => current.filter((item) => !users.ids_array.includes(item.id)));
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuarios eliminados exitosamente' });
          }
        });
      }
    });
  }
}
