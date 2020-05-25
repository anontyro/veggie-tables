export interface StockItem {
  id?: number;
  name: string;
  unitPrice: number;
  currency: string;
  imageUrl?: string;
  stockLevel: number;
  description?: string;
  stockCode: string;
}

export interface StockImage {
  name: string;
  path: string;
}

export interface StockImageForm {
  image: File;
  dir?: string;
}

export interface StockDetails {
  id?: number;
  body: string;
  stockCode: string;
  title: string;
  isShown: boolean;
  order: number;
}

export interface StockCompleteItem {
  item: StockItem;
  promotions: [];
  details: StockDetails[];
}
