import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AdPosition {
  BANNER_TOP = 'BANNER_TOP',
  SIDEBAR = 'SIDEBAR',
  IN_FEED = 'IN_FEED',
  POPUP = 'POPUP',
}

@Entity('ads')
export class Ad {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  imageUrl: string;

  @Column()
  targetUrl: string;

  @Column({
    type: 'enum',
    enum: AdPosition,
    default: AdPosition.BANNER_TOP,
  })
  position: AdPosition;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  impressions: number;

  @Column({ default: 0 })
  clicks: number;

  @Column({ nullable: true })
  startDate?: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
