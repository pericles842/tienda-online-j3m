import { LayoutService } from '@/layout/service/layout.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home',
  imports: [CarouselModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  products = [
    {
      discount: '50%',
      Title: 'Macbook Pro',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75'
    },
    {
      discount: '30%',
      Title: 'Iphone 13',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75'
    },
    {
      discount: '20%',
      Title: 'Apple Watch',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75'
    }
  ];
  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  constructor(
    public layoutService: LayoutService
  ){}
}
