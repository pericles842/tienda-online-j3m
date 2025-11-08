import { DollarInformation } from '@/interfaces/configuration';
import { ConfigurationService } from '@/services/configuration.service';
import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-card-rates',
  imports: [CommonModule],
  templateUrl: './card-rates.html',
  styleUrl: './card-rates.scss'
})
export class CardRates {
  rates: WritableSignal<DollarInformation[] | []> = signal([]);

  dateTime: string = new Date().toISOString();
  constructor(public configurationService: ConfigurationService) {}

  ngOnInit() {
    this.configurationService.getRates().subscribe((rates) => this.rates.set(rates));
  }
}
