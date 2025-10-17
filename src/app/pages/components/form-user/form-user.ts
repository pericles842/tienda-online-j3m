import { Municipality, Parish, State } from '@/interfaces/cities';
import { PublicGroup } from '@/interfaces/groups';
import { CreateUserTypeClient } from '@/interfaces/user';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { passwordMatchValidator } from '@/pages/auth/register/register';
import { PublicGroupsService } from '@/services/groups.service';
import { StatesService } from '@/services/states.service';
import { UserService } from '@/services/user.service';
import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-form-user',
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
    RouterModule,
    Message,
    ToastModule
  ],
  templateUrl: './form-user.html',
  styleUrl: './form-user.scss'
})
export class FormUser {
  /**
   *indica en que moda estara el componente
   *
   * @type {('account'|'crud')}
   * @memberof Users
   */
  @Input() mode_component: 'account' | 'crud' = 'account';
  
  loading: WritableSignal<boolean> = signal(false);
  loading_public_groups: WritableSignal<boolean> = signal(false);
  /**
   *Cajas de ahorro
   *
   * @type {PublicGroup[]}
   * @memberof RegisterComponent
   */
  public_groups: PublicGroup[] = [];

  //estados
  states: State[] = [];
  municipalities: Municipality[] = [];
  parishes: Parish[] = [];

  registerForm: FormGroup = new FormGroup<CreateUserTypeClient>(
    {
      name: new FormControl('', [Validators.required]),
      last_name: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      ci: new FormControl('', {
        validators: [Validators.required, Validators.minLength(7)],
        nonNullable: true
      }),
      phone: new FormControl('', [Validators.required]),
      phone_2: new FormControl(''),
      age: new FormControl('', [Validators.required]),
      public_group_id: new FormControl('', [Validators.required]),
      rol_id: new FormControl(6, [Validators.required]),
      state_id: new FormControl('', [Validators.required]),
      city_id: new FormControl('', [Validators.required]),
      parish_id: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required])
    },
    { validators: passwordMatchValidator }
  );

  constructor(
    private statesService: StatesService,
    private publicGroupsService: PublicGroupsService,
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getPublicGroups();
    this.getStates();
  }

  /**
   *obtiene las cajas de ahorro
   *
   * @memberof RegisterComponent
   */
  getPublicGroups() {
    this.loading_public_groups.set(true);
    this.publicGroupsService.getPublicGroups().subscribe({
      next: (groups) => {
        this.public_groups = groups;
        this.loading_public_groups.set(false);
      },
      error: (error) => {
        console.log(error);
        this.loading_public_groups.set(false);
      }
    });
  }
  getStates() {
    this.loading.set(true);
    this.statesService.getStates().subscribe({
      next: (states) => {
        this.states = states;
        this.loading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.loading.set(false);
      }
    });
  }
  /**
   *Obtiene los municipios
   *
   * @param {number} state_id
   * @memberof RegisterComponent
   */
  getCities(state_id: number) {
    //limpiamos seleccioables
    this.municipalities = [];
    this.parishes = [];

    this.loading.set(true);
    this.statesService.getMunicipalices(state_id).subscribe({
      next: (municipalices) => {
        this.municipalities = municipalices;
        this.loading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.loading.set(false);
      }
    });
  }
  getParishes(municipality_id: number) {
    this.loading.set(true);
    this.statesService.getParishes(municipality_id).subscribe({
      next: (parishes) => {
        this.parishes = parishes;
        this.loading.set(false);
      },
      error: (error) => {
        console.log(error);
        this.loading.set(false);
      }
    });
  }
  createUser() {
    this.registerForm.markAllAsDirty();
    this.registerForm.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.registerForm.valid) return;

    this.userService.createClient(this.registerForm.value).subscribe({
      next: (user) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Usuario creado exitosamente', life: 3000 });

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      }
    });
  }
}
