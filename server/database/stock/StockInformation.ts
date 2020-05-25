import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from 'typeorm';

@Entity()
export default class StockInformation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'information_body', type: 'text' })
  body: string;

  @Column({ name: 'stock_code' })
  stockCode: string;

  @Column({ name: 'information_title', nullable: true })
  title: string;

  @Column({ name: 'is_shown', type: 'tinyint' })
  isShown: boolean;

  @Column({ name: 'order', type: 'int' })
  order: number;
}
