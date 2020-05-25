import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from 'typeorm';

@Entity()
export default class PromotionTypes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'promotion_name' })
  promotionName: string;

  @Column({ name: 'quantity_required', type: 'int', nullable: true })
  quantityRequired: number;

  @Column({ name: 'percentage_adjustment', type: 'double' })
  percentageAdjustment: number;

  @Column({ name: 'promotion_code' })
  promotionCode: string;

  @Column({ name: 'quantity_max', nullable: true })
  quantityMax: number;
}
