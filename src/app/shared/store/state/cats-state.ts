import { Cat } from '../../types';

export interface CatsState {
  cats: Cat[];
  selected_id: string | null;
  error: string | null;
}
