import { MenuItem } from 'primeng/api';

export const menu: MenuItem[] = [
  {
    label: 'Analisis',
    items: [
      { label: 'Ventas', icon: 'pi pi-fw pi-chart-line', routerLink: ['/'] },
      { label: 'Inventario', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/'] }
    ]
  },
  {
    label: 'Configuracion',
    items: [
      { label: 'Métodos de pago', icon: 'pi pi-fw pi-credit-card', routerLink: ['/'] },
      { label: 'Tasas de conversion', icon: 'pi pi-fw pi-dollar', routerLink: ['/'] }
    ]
  },
  {
    label: 'Administración',
    items: [
      { label: 'Cargos y permisos', icon: 'pi pi-fw pi-key', routerLink: ['/'] },
      { label: 'Cajas de ahorro', icon: 'pi pi-fw pi-users', routerLink: ['/'] },
      { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/'] },
      { label: 'ventas', icon: 'pi pi-fw pi-megaphone', routerLink: ['/'] }
    ]
  },
  {
    label: 'inventario',
    items: [
      { label: 'Productos', icon: 'pi pi-fw pi-barcode', routerLink: ['/'] },
      { label: 'Categorías', icon: 'pi pi-fw pi-tag', routerLink: ['/'] }
    ]
  }
];
