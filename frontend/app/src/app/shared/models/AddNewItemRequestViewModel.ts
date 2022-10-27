import { CategoryType } from './enums/CategoryType';

export interface AddNewItemRequestViewModel {
  name: string;
  description: string;
  photoUrl: string;
  price: number;
  category: string;
}
