import { Component, signal, WritableSignal } from '@angular/core';
import { Header } from '../components/header/header';
import { RouterModule } from '@angular/router';
import { Footer } from '../components/footer/footer';
import { ConfigurationService } from '@/services/configuration.service';
import { SystemConfiguration } from '@/interfaces/configuration';

@Component({
  selector: 'app-web-shop',
  imports: [Header, RouterModule, Footer],
  templateUrl: './web-shop.html',
  styleUrl: './web-shop.scss'
})
export class WebShop {
  config: WritableSignal<SystemConfiguration> = signal<SystemConfiguration>({
    id: 0,
    automatic_rate: false,
    type_rate: 'bcv',
    rate_manual: 0,
    email: '',
    phone: '',
    ig: '',
    fb: ''
  });
  constructor(private configurationService: ConfigurationService) {}

  ngOnInit() {
    this.configurationService.getPublicConfiguration().subscribe((config) => this.config.set(config));
  }
}
