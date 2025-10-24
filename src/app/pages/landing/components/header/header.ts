import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';
import { LayoutService } from '@/layout/service/layout.service';
import { AuthService } from '@/services/auth.service';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule } from 'primeng/megamenu';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';
import { AppConfigurator } from "@/layout/component/app.configurator";
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-header',
  imports: [AppFloatingConfigurator
    , ButtonModule, MegaMenuModule, RouterLink, OverlayBadgeModule, AvatarModule, TooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    public router: Router
  ) {}

  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        styleClass: 'text-primary',
        label: 'Furniture',
        icon: 'pi pi-box',
        items: [
          [
            {
              label: 'Living Room',
              items: [
                { label: 'Accessories' },
                { label: 'Armchair' },
                { label: 'Coffee Table' },
                { label: 'Couch' },
                { label: 'TV Stand' }
              ]
            }
          ],
          [
            {
              label: 'Kitchen',
              items: [{ label: 'Bar stool' }, { label: 'Chair' }, { label: 'Table' }]
            },
            {
              label: 'Bathroom',
              items: [{ label: 'Accessories' }]
            }
          ],
          [
            {
              label: 'Bedroom',
              items: [
                { label: 'Bed' },
                { label: 'Chaise lounge' },
                { label: 'Cupboard' },
                { label: 'Dresser' },
                { label: 'Wardrobe' }
              ]
            }
          ],
          [
            {
              label: 'Office',
              items: [
                { label: 'Bookcase' },
                { label: 'Cabinet' },
                { label: 'Chair' },
                { label: 'Desk' },
                { label: 'Executive Chair' }
              ]
            }
          ]
        ]
      },
      {
        label: 'Electronics',
        icon: 'pi pi-mobile',
        items: [
          [
            {
              label: 'Computer',
              items: [
                { label: 'Monitor' },
                { label: 'Mouse' },
                { label: 'Notebook' },
                { label: 'Keyboard' },
                { label: 'Printer' },
                { label: 'Storage' }
              ]
            }
          ],
          [
            {
              label: 'Home Theater',
              items: [{ label: 'Projector' }, { label: 'Speakers' }, { label: 'TVs' }]
            }
          ],
          [
            {
              label: 'Gaming',
              items: [{ label: 'Accessories' }, { label: 'Console' }, { label: 'PC' }, { label: 'Video Games' }]
            }
          ],
          [
            {
              label: 'Appliances',
              items: [
                { label: 'Coffee Machine' },
                { label: 'Fridge' },
                { label: 'Oven' },
                { label: 'Vaccum Cleaner' },
                { label: 'Washing Machine' }
              ]
            }
          ]
        ]
      },
      {
        label: 'Sports',
        icon: 'pi pi-clock',
        items: [
          [
            {
              label: 'Football',
              items: [{ label: 'Kits' }, { label: 'Shoes' }, { label: 'Shorts' }, { label: 'Training' }]
            }
          ],
          [
            {
              label: 'Running',
              items: [{ label: 'Accessories' }, { label: 'Shoes' }, { label: 'T-Shirts' }, { label: 'Shorts' }]
            }
          ],
          [
            {
              label: 'Swimming',
              items: [{ label: 'Kickboard' }, { label: 'Nose Clip' }, { label: 'Swimsuits' }, { label: 'Paddles' }]
            }
          ],
          [
            {
              label: 'Tennis',
              items: [{ label: 'Balls' }, { label: 'Rackets' }, { label: 'Shoes' }, { label: 'Training' }]
            }
          ]
        ]
      }
    ];
  }

  /**
   *Obtiene el nombre completo
   *
   * @readonly
   * @memberof Header
   */
  get full_name() {
    const user = this.authService.getUser();

    if (!user) {
      return '';
    }

    return user.name + ' ' + user.last_name;
  }

  /**
   *Verifica si existe el token
   *
   * @readonly
   * @memberof Header
   */
  get isExistToken() {
    const t = this.authService.getToken();

    if (!t) {
      return false;
    }

    return true;
  }
  /**
   *obtiene las iniciales del prime y segundo nombre del name
   *
   * @readonly
   * @memberof Header
   */
  get wordsInName() {
    const user = this.authService.getUser();

    if (!user) {
      return '';
    }

    const array_words = user.name.split(' ');

    if (array_words.length === 1) {
      return array_words[0].charAt(0).toUpperCase() || '';
    }

    return array_words[0].charAt(0).toUpperCase() + array_words[1].charAt(0).toUpperCase() || '';
  }

  logout(){
    this.authService.logout()
  }
}
