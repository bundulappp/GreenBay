import { CategoryType } from '../enums/CategoryType';

export interface AddNewItemRequestModel {
  itemName: string;
  description: string;
  photoUrl: string;
  price: number;
  userId: number;
  category: CategoryType;
}
