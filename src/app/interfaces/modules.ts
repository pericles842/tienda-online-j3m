export type TypeModules = {
  [key: string]: {
    id: number;
    name: string;
  };
};

export const Modules: TypeModules = {
  configuracion: { id: 1, name: 'Configuración' },
  cargos: { id: 2, name: 'Cargos y permisos' },
  usuarios: { id: 3, name: 'Usuarios' },
  categorias: { id: 4, name: 'Categorías' },
  productos: { id: 5, name: 'Productos' },
  ventas: { id: 6, name: 'Ventas' },
  cajas_ahorro: { id: 7, name: 'Cajas de ahorro' },
  inventario: { id: 8, name: 'Inventario' },
  estadisticas_ventas: { id: 9, name: 'Estadisticas de ventas' },
  metodos_pago: { id: 10, name: 'Métodos de pago' }
} as const;
