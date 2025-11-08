import { Component } from '@angular/core';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SystemConfigurationFormGroup, TypeRate } from '@/interfaces/configuration';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { CardRates } from '@/pages/components/card-rates/card-rates';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { ConfigurationService } from '@/services/configuration.service';

@Component({
  selector: 'app-configuration',
  imports: [
    AppMenuBar,
    FormsModule,
    CheckboxModule,
    ReactiveFormsModule,
    CardRates,
    CommonModule,
    InputTextModule,
    Message,
    RadioButtonModule
  ],
  templateUrl: './configuration.html',
  styleUrl: './configuration.scss'
})
export class Configuration {
  configuration: FormGroup<SystemConfigurationFormGroup> = new FormGroup<SystemConfigurationFormGroup>({
    id: new FormControl<number>(0),
    automatic_rate: new FormControl<boolean>(true),
    type_rate: new FormControl<TypeRate>('bcv'),
    rate_manual: new FormControl<number>(1.0),
    email: new FormControl<string>('j3m@gmail.com', Validators.required),
    phone: new FormControl<string>('0412045678', Validators.required),
    ig: new FormControl<string>('@j3m', Validators.required),
    fb: new FormControl<string>('@j3m', Validators.required)
  });

  constructor(
    private messageService: MessageService,
    private configurationService: ConfigurationService
  ) {}
  ngOnInit() {
    this.configurationService.getConfiguration().subscribe((configuration) => {
      this.configuration.patchValue(configuration);
    });
  }

  guardar() {
    this.configuration.markAllAsDirty();
    this.configuration.updateValueAndValidity();

    if (!this.configuration.valid) return;

    this.configurationService.updateConfiguration(this.configuration.value).subscribe({
      next: (config) => {
        this.configuration.patchValue(config);
        this.messageService.add({ severity: 'success', summary: 'Guardado', detail: 'Configuracion Guardado correctamente' });
      }
    });
  }
}
