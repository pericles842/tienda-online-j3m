import { Modules } from '@/interfaces/modules';
import { MenuItem } from 'primeng/api';

/**
 *Esta interfaz modifica las propiedades del menu
 *
 * @export
 * @interface CustomMenuItem
 * @extends {MenuItem}
 */
export interface CustomMenuItem extends MenuItem {
  module_id?: number;
  items?: CustomMenuItem[];
}

export const menu: CustomMenuItem[] = [
  {
    label: 'Analisis',
    items: [
      { label: 'Ventas', icon: 'pi pi-fw pi-chart-line', routerLink: ['/'], module_id: Modules['estadisticas_ventas'].id },
      { label: 'Inventario', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/'], module_id: Modules['inventario'].id }
    ]
  },
  {
    label: 'Configuración',
    items: [
      {
        label: 'Métodos de pago',
        icon: 'pi pi-fw pi-credit-card',
        routerLink: ['/pages/metodos_pago'],
        module_id: Modules['metodos_pago'].id
      },
      {
        label: 'Configuración',
        icon: 'pi pi-fw pi-cog',
        routerLink: ['/pages/configuracion'],
        module_id: Modules['configuracion'].id
      }
    ]
  },
  {
    label: 'Administración',
    items: [
      { label: 'Cargos y permisos', icon: 'pi pi-fw pi-key', routerLink: ['/pages/cargos'], module_id: Modules['cargos'].id },
      {
        label: 'Cajas de ahorro',
        icon: 'pi pi-fw pi-users',
        routerLink: ['/pages/cajas_ahorro'],
        module_id: Modules['cajas_ahorro'].id
      },
      { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/pages/usuarios'], module_id: Modules['usuarios'].id },
      { label: 'ventas', icon: 'pi pi-fw pi-megaphone', routerLink: ['/'], module_id: Modules['ventas'].id }
    ]
  },
  {
    label: 'inventario',
    items: [
      { label: 'Productos', icon: 'pi pi-fw pi-barcode', routerLink: ['/pages/productos'], module_id: Modules['productos'].id },
      { label: 'Categorías', icon: 'pi pi-fw pi-tag', routerLink: ['/pages/categorias'], module_id: Modules['categorias'].id }
    ]
  }
  // },
  // {
  //   label: 'UI Components',
  //   items: [
  //     { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
  //     { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
  //     { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
  //     { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
  //     { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
  //     { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
  //     { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
  //     { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
  //     { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
  //     { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
  //     { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
  //     { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
  //     { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
  //     { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
  //     { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
  //   ]
  // },
  // {
  //   label: 'Pages',
  //   icon: 'pi pi-fw pi-briefcase',
  //   routerLink: ['/pages'],
  //   items: [
  //     {
  //       label: 'Landing',
  //       icon: 'pi pi-fw pi-globe',
  //       routerLink: ['/landing']
  //     },
  //     {
  //       label: 'Auth',
  //       icon: 'pi pi-fw pi-user',
  //       items: [
  //         {
  //           label: 'Login',
  //           icon: 'pi pi-fw pi-sign-in',
  //           routerLink: ['/auth/login']
  //         },
  //         {
  //           label: 'Registro',
  //           icon: 'pi pi-fw pi-sign-in',
  //           routerLink: ['/auth/register']
  //         },
  //         {
  //           label: 'Error',
  //           icon: 'pi pi-fw pi-times-circle',
  //           routerLink: ['/auth/error']
  //         },
  //         {
  //           label: 'Access Denied',
  //           icon: 'pi pi-fw pi-lock',
  //           routerLink: ['/auth/access']
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Crud',
  //       icon: 'pi pi-fw pi-pencil',
  //       routerLink: ['/pages/crud']
  //     },
  //     {
  //       label: 'Not Found',
  //       icon: 'pi pi-fw pi-exclamation-circle',
  //       routerLink: ['/pages/notfound']
  //     },
  //     {
  //       label: 'Empty',
  //       icon: 'pi pi-fw pi-circle-off',
  //       routerLink: ['/pages/empty']
  //     }
  //   ]
  // },
  // {
  //   label: 'Hierarchy',
  //   items: [
  //     {
  //       label: 'Submenu 1',
  //       icon: 'pi pi-fw pi-bookmark',
  //       items: [
  //         {
  //           label: 'Submenu 1.1',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
  //             { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
  //           ]
  //         },
  //         {
  //           label: 'Submenu 1.2',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
  //         }
  //       ]
  //     },
  //     {
  //       label: 'Submenu 2',
  //       icon: 'pi pi-fw pi-bookmark',
  //       items: [
  //         {
  //           label: 'Submenu 2.1',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [
  //             { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
  //             { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
  //           ]
  //         },
  //         {
  //           label: 'Submenu 2.2',
  //           icon: 'pi pi-fw pi-bookmark',
  //           items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   label: 'Get Started',
  //   items: [
  //     {
  //       label: 'Documentation',
  //       icon: 'pi pi-fw pi-book',
  //       routerLink: ['/documentation']
  //     },
  //     {
  //       label: 'View Source',
  //       icon: 'pi pi-fw pi-github',
  //       url: 'https://github.com/primefaces/sakai-ng',
  //       target: '_blank'
  //     }
  //   ]
  // }
];
