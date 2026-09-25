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

export enum DifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
  EXPERT = 'EXPERT',
}

export enum SwimLevel {
  TOP = 'TOP',
  MIDDLE = 'MIDDLE',
  BOTTOM = 'BOTTOM',
  ALL = 'ALL',
}

@Entity('fish_categories')
export class FishCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  parentId: string;

  @Column('simple-array', { nullable: true })
  parentIds: string[];

  @ManyToOne(() => FishCategory, (category) => category.children, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: FishCategory;

  @OneToMany(() => FishCategory, (category) => category.parent)
  children: FishCategory[];

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('fish')
export class Fish {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  slug: string;

  @Column()
  nameVi: string;

  @Column({ nullable: true })
  nameEn: string;

  @Column({ nullable: true })
  scientificName: string;

  @Column('simple-array', { nullable: true })
  images: string[];

  @Column({ nullable: true })
  categoryId: string;

  @ManyToOne(() => FishCategory, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'categoryId' })
  category: FishCategory;

  @Column('simple-array', { nullable: true })
  categoryIds: string[];

  @Column('simple-array', { nullable: true })
  categorySlugs: string[];

  @Column({ type: 'float', nullable: true })
  sizeMin: number;

  @Column({ type: 'float', nullable: true })
  sizeMax: number;

  @Column({ nullable: true })
  lifespan: string;

  @Column({ type: 'enum', enum: DifficultyLevel, default: DifficultyLevel.EASY })
  difficulty: DifficultyLevel;

  @Column({ type: 'float', nullable: true })
  tempMin: number;

  @Column({ type: 'float', nullable: true })
  tempMax: number;

  @Column({ type: 'float', nullable: true })
  phMin: number;

  @Column({ type: 'float', nullable: true })
  phMax: number;

  @Column({ type: 'float', nullable: true })
  ghMin: number;

  @Column({ type: 'float', nullable: true })
  ghMax: number;

  @Column({ type: 'float', nullable: true })
  khMin: number;

  @Column({ type: 'float', nullable: true })
  khMax: number;

  @Column({ type: 'int', nullable: true })
  minTankSize: number;

  @Column({ type: 'enum', enum: SwimLevel, default: SwimLevel.MIDDLE })
  swimLevel: SwimLevel;

  @Column({ nullable: true })
  temperament: string;

  @Column({ type: 'text', nullable: true })
  diet: string;

  @Column({ type: 'text', nullable: true })
  compatibleFish: string;

  @Column({ type: 'text', nullable: true })
  incompatibleFish: string;

  @Column({ type: 'text', nullable: true })
  commonDiseases: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
