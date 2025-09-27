export interface State {
  id: number;
  name: string;
}

export interface Municipality {
  id: number;
  name: string;
  state_id: number;
}

export interface Parish {
  id: number;
  name: string;
  city_id: number;
}
