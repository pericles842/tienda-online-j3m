export interface Column {
  style?: string;
  field: string;

  key: string;
  customExportHeader?: string;
  sortTable: boolean;
}
