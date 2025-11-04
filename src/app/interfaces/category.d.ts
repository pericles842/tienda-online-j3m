export interface Category {
  id: number;
  name: string;
  parent_id: number;
  created_at: string;
}

export type CategoryForm = FormGroupControls<Category>;
