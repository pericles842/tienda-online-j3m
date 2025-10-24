import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { HeroWidget } from './components/herowidget';
import { TopbarWidget } from './components/topbarwidget.component';
import { Header } from "./components/header/header";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, RippleModule, StyleClassModule, ButtonModule, DividerModule, Header],
  templateUrl: './landing.html'
})
export class Landing {}
