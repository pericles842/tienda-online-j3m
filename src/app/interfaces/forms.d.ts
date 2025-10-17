export interface Column {
  style?: string;
  label: string;
  key: string;
  customExportHeader?: string;
  sortTable: boolean;
  dataType?: 'string' | 'number' | 'date' | 'boolean';
}

/**
 * Botones de acciones en la stablas dinamicas
 *
 * @export
 * @interface ActionTableButton
 */
export interface ActionTableButton {
  icon: string;
  tooltip?: string;
  severity: ButtonSeverity;
  rounded: boolean;
  outlined: boolean;
  method: (event: any) => void;
}
