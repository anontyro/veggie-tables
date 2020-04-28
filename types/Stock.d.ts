export interface StockItem {
  id?: number;
  name: string;
  unitPrice: number;
  currency: string;
  imageUrl?: string;
  stockLevel: number;
  description?: string;
}
