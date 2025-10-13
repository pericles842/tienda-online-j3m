export interface Column {
  style?: string;
  label: string;

  key: string;
  customExportHeader?: string;
  sortTable: boolean;
}
