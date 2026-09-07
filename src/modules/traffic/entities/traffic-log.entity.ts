import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('traffic_logs')
export class TrafficLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  path: string;

  @Column({ nullable: true })
  method: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ type: 'text', nullable: true })
  userAgent: string;

  @Column({ nullable: true })
  device: string; // 'DESKTOP', 'MOBILE', 'TABLET'

  @Column({ nullable: true })
  browser: string;

  @Column({ nullable: true })
  referrer: string;

  @Column({ nullable: true })
  userId: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;
}
