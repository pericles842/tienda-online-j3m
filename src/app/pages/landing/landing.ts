import { AppFooter } from '@/layout/component/app.footer';
import { LayoutService } from '@/layout/service/layout.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Home } from './components/home/home';
import { Product } from './components/product/product';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RippleModule,
    StyleClassModule,
    ButtonModule,
    DividerModule,
    Header,
    Home,
    Product,
    Footer
  ],
  templateUrl: './landing.html'
})
export class Landing {
  products = [
    {
      id: 1,
      name: 'Laptop Inovo',
      discount: 20,
      price: 120.1, // Ajuste para un precio más realista
      price_bs: 4323.6,
      stock: 10,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'InovoTech',
      description: 'Portátil potente para trabajo y estudio, con 8GB de RAM y 256GB SSD.'
    },
    {
      id: 2,
      name: 'Smartphone Aurora X',
      discount: 15,
      price: 85.99,
      price_bs: 3095.64,
      stock: 25,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'StellarCom',
      description: 'Teléfono inteligente con cámara de 48MP y batería de larga duración.'
    },
    {
      id: 3,
      name: 'Audífonos SoundBeat',
      discount: 5,
      price: 15.5,
      price_bs: 558.0,
      stock: 50,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'AudioWave',
      description: 'Auriculares inalámbricos TWS con cancelación de ruido activa.'
    },
    {
      id: 4,
      name: 'Mouse Óptico Pro',
      discount: 10,
      price: 5.99,
      price_bs: 215.64,
      stock: 80,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'TecnoGear',
      description: 'Ratón ergonómico de alta precisión con 5 botones programables.'
    },
    {
      id: 5,
      name: 'Tablet SketchPad',
      discount: 25,
      price: 69.99,
      price_bs: 2519.64,
      stock: 15,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'DrawEasy',
      description: 'Tableta gráfica de 10 pulgadas con lápiz óptico sensible a la presión.'
    },
    {
      id: 6,
      name: 'Teclado Mecánico K1',
      discount: 0,
      price: 35.0,
      price_bs: 1260.0,
      stock: 30,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'AlphaKeys',
      description: 'Teclado con switches mecánicos Outemu Blue y retroiluminación RGB.'
    },
    {
      id: 7,
      name: 'Bocina',
      discount: 12,
      price: 105.75,
      price_bs: 3807.0,
      stock: 5,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'JBL',
      description: 'Bocina jbl'
    },
    {
      id: 8,
      name: 'Webcam StreamPro',
      discount: 18,
      price: 25.4,
      price_bs: 914.4,
      stock: 40,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'VisionTech',
      description: 'Cámara web Full HD (1080p) con micrófono estéreo integrado.'
    },
    {
      id: 9,
      name: 'Monitor Curvo V32',
      discount: 20,
      price: 199.99,
      price_bs: 7199.64,
      stock: 8,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'DisplayMax',
      description: 'Monitor de 32" curvo, 144Hz, ideal para gaming y multimedia.'
    },
    {
      id: 10,
      name: 'Disco Duro SSD 1TB',
      discount: 15,
      price: 45.99,
      price_bs: 1655.64,
      stock: 20,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Componentes',
      brand: 'SpeedStorage',
      description: 'Unidad de estado sólido SATA III de 1TB para mejorar la velocidad del sistema.'
    }
  ];

  constructor(public layoutService: LayoutService) {}
}
