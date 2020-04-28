export interface StockItem {
  id?: number;
  name: string;
  unitPrice: number;
  currency: string;
  imageUrl?: string;
  stockLevel: number;
  description?: string;
}

export interface StockImage {
  name: string;
  path: string;
}

export interface StockImageForm {
  image: File;
  dir?: string;
}
