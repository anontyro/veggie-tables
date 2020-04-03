import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class Stock extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: 0.0, name: 'unit_price', type: 'double' })
  unitPrice: number;

  @Column({ default: 'SGD' })
  currency: string;

  @Column({ nullable: true, name: 'image_url' })
  imageUrl: string;

  @Column({ default: 0, name: 'stock_level' })
  stockLevel: number;

  @Column({ nullable: true })
  description: string;
}
