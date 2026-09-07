import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Fish } from '../../fish/entities/fish.entity';

@Entity('tanks')
export class Tank {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  ownerId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column({ nullable: true })
  coverImage: string;

  @Column({ type: 'float', nullable: true })
  length: number;

  @Column({ type: 'float', nullable: true })
  width: number;

  @Column({ type: 'float', nullable: true })
  height: number;

  @Column({ type: 'float', nullable: true })
  volume: number;

  @Column({ type: 'float', nullable: true })
  ph: number;

  @Column({ type: 'float', nullable: true })
  temperature: number;

  @Column({ default: true })
  isPublic: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('tank_fish')
export class TankFish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tankId: string;

  @ManyToOne(() => Tank, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tankId' })
  tank: Tank;

  @Column()
  fishId: string;

  @ManyToOne(() => Fish, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'fishId' })
  fish: Fish;

  @Column({ default: 1 })
  quantity: number;

  @CreateDateColumn()
  addedAt: Date;
}

export enum TankLogType {
  WATER_CHANGE = 'WATER_CHANGE',
  FEEDING = 'FEEDING',
  PARAMETER = 'PARAMETER',
  NOTE = 'NOTE',
  DISEASE = 'DISEASE',
}

@Entity('tank_logs')
export class TankLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tankId: string;

  @ManyToOne(() => Tank, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tankId' })
  tank: Tank;

  @Column({ type: 'enum', enum: TankLogType, default: TankLogType.NOTE })
  type: TankLogType;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'jsonb', nullable: true })
  parameters: Record<string, any>;

  @Column('simple-array', { nullable: true })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;
}
