import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Generated,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import PromotionTypes from '../promotion/PromotionTypes';

@Entity()
export default class StockPromotions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'stock_code' })
  stockCode: string;

  @Column({ name: 'start_date', type: 'datetime', nullable: true })
  startDate: Date;

  @Column({ name: 'end_date', type: 'datetime', nullable: true })
  endDate: Date;

  @Column({ name: 'limited_quantity', type: 'tinyint', nullable: true })
  limitedQuantity: boolean;

  @Column({ name: 'promotion_offer', nullable: true })
  promotionOffer: string;

  @Column({ name: 'is_active', nullable: true, type: 'tinyint' })
  isActive;

  @OneToOne(type => PromotionTypes)
  @JoinColumn()
  promotionTypes: PromotionTypes;
}
