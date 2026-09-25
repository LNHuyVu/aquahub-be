import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum ListingStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SOLD = 'SOLD',
  REJECTED = 'REJECTED',
  HIDDEN = 'HIDDEN',
}

export enum ListingCondition {
  NEW = 'NEW',
  LIKE_NEW = 'LIKE_NEW',
  USED = 'USED',
}

export enum PriceType {
  FIXED = 'FIXED',
  NEGOTIABLE = 'NEGOTIABLE',
  CONTACT = 'CONTACT',
  GIVEAWAY = 'GIVEAWAY',
}

@Entity('listing_categories')
export class ListingCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => Listing, (listing) => listing.category)
  listings: Listing[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('listings')
export class Listing {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 12, scale: 0, default: 0 })
  price: number;

  @Column({
    type: 'enum',
    enum: PriceType,
    default: PriceType.FIXED,
  })
  priceType: PriceType;

  @Column({
    type: 'enum',
    enum: ListingCondition,
    default: ListingCondition.LIKE_NEW,
  })
  condition: ListingCondition;

  @Column({
    type: 'enum',
    enum: ListingStatus,
    default: ListingStatus.ACTIVE,
  })
  @Index()
  status: ListingStatus;

  @Column({ type: 'json', nullable: true })
  imageData: Array<{
    url: string;
    thumbnailUrl?: string;
    width?: number;
    height?: number;
    caption?: string;
  }>;

  @Column({ type: 'simple-array', nullable: true })
  images: string[];

  @Column({ type: 'json', nullable: true })
  videosData: Array<{
    url: string;
    thumbnailUrl?: string;
    title?: string;
    duration?: number;
  }>;

  @Column({ nullable: true })
  videoUrl: string;

  // Contact information
  @Column()
  contactName: string;

  @Column()
  contactPhone: string;

  @Column({ nullable: true })
  contactZalo: string;

  // Address
  @Column()
  province: string;

  @Column({ nullable: true })
  district: string;

  @Column({ nullable: true })
  ward: string;

  @Column({ nullable: true })
  streetAddress: string;

  @Column({ nullable: true })
  oldAddressNote: string; // Mapping notes (e.g. "Cũ: Quận 2, TP.HCM")

  // Shipping
  @Column({ default: false })
  shippingAvailable: boolean;

  @Column({ nullable: true })
  shippingNote: string;

  // Stats
  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likesCount: number;

  @Column({ default: 0 })
  commentsCount: number;

  @Column({ default: false })
  isPinned: boolean;

  // Shopee Affiliate Product Info (Admin only)
  @Column({ nullable: true })
  shopeeProductUrl: string;

  @Column({ nullable: true })
  shopeeProductName: string;

  @Column({ type: 'decimal', precision: 14, scale: 0, nullable: true })
  shopeePrice: number;

  @Column({ nullable: true })
  shopeeImageUrl: string;

  @Column({ nullable: true })
  shopeeCommissionRate: string; // e.g. "5%" or "12.5%"

  // Relations
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => ListingCategory, (cat) => cat.listings, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'categoryId' })
  category: ListingCategory;

  @Column({ nullable: true })
  categoryId: string;

  @OneToMany(() => ListingComment, (comment) => comment.listing)
  comments: ListingComment[];

  @OneToMany(() => ListingLike, (like) => like.listing)
  likes: ListingLike[];

  @OneToMany(() => ListingReport, (report) => report.listing)
  reports: ListingReport[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

@Entity('listing_comments')
export class ListingComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Listing, (listing) => listing.comments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listingId' })
  listing: Listing;

  @Column()
  listingId: string;

  @ManyToOne(() => ListingComment, { nullable: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parentId' })
  parent: ListingComment;

  @Column({ nullable: true })
  parentId: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('listing_likes')
export class ListingLike {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Listing, (listing) => listing.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listingId' })
  listing: Listing;

  @Column()
  listingId: string;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity('listing_reports')
export class ListingReport {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  reason: string;

  @Column({ default: 'PENDING' })
  status: string; // PENDING, RESOLVED, DISMISSED

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Listing, (listing) => listing.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'listingId' })
  listing: Listing;

  @Column()
  listingId: string;

  @CreateDateColumn()
  createdAt: Date;
}
