export interface PublicGroup {
  id: number;
  name: string;
  description: string;
  rif: string;
  email: string;
  url_img: string;
  created_at?: string;
}

export type PublicGroupFormGroup = FormGroupControls<PublicGroup>;
