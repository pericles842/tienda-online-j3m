import { SystemConfiguration } from '@/interfaces/configuration';
import { ConfigurationService } from '@/services/configuration.service';
import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-footer-custom',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  private date = new Date();
  @Input() config!: WritableSignal<SystemConfiguration>;

  get fechaActual(): string {
    return this.date.getFullYear().toString();
  }
}
