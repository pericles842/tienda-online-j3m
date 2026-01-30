import { LayoutService } from '@/layout/service/layout.service';
import { NodeService } from '@/pages/service/node.service';
import { AuthService } from '@/services/auth.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TreeNode } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { PageSections } from '../page-sections/page-sections';
import { ShoppingCart } from '../shopping-cart/shopping-cart';
import { CategoriesService } from '@/services/categories.service';
import { FormsModule } from '@angular/forms'; // Added import

@Component({
  selector: 'app-header',
  imports: [
    ButtonModule,
    TreeModule,
    RouterLink,
    OverlayBadgeModule,
    AvatarModule,
    TooltipModule,
    DrawerModule,
    TableModule,
    PageSections,
    ShoppingCart,
    FormsModule
  ],
  providers: [NodeService],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  menuVisible: WritableSignal<boolean> = signal(false);
  visibleSearch: WritableSignal<boolean> = signal(false);

  searchQuery: string = '';

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    public router: Router,
    private categoriesService: CategoriesService
  ) { }

  files!: TreeNode[];

  ngOnInit() {
    this.categoriesService.getCategoriesTree().subscribe((files) => (this.files = files));
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/shop'], { queryParams: { q: this.searchQuery } });
    } else {
      this.router.navigate(['/shop']);
    }
    this.visibleSearch.set(false);
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

  logout() {
    this.authService.logout();
  }
}
