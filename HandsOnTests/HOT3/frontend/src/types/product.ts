export interface BaseProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  createdOn?: Date;
  lastUpdatedOn?: Date;
}

export type Product = BaseProduct