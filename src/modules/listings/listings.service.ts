import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Listing,
  ListingCategory,
  ListingComment,
  ListingLike,
  ListingReport,
  ListingStatus,
} from './entities/listing.entity';
import {
  CreateListingDto,
  UpdateListingDto,
  QueryListingDto,
  CreateListingCategoryDto,
  UpdateListingCategoryDto,
  CreateListingCommentDto,
  CreateListingReportDto,
} from './dto/listings.dto';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingRepo: Repository<Listing>,
    @InjectRepository(ListingCategory)
    private categoryRepo: Repository<ListingCategory>,
    @InjectRepository(ListingComment)
    private commentRepo: Repository<ListingComment>,
    @InjectRepository(ListingLike)
    private likeRepo: Repository<ListingLike>,
    @InjectRepository(ListingReport)
    private reportRepo: Repository<ListingReport>,
  ) {}

  // ----------------------------------------------------
  // CATEGORIES CRUD
  // ----------------------------------------------------
  async findAllCategories() {
    return this.categoryRepo.find({
      order: { order: 'ASC', createdAt: 'DESC' },
      relations: { listings: true },
    });
  }

  async createCategory(dto: CreateListingCategoryDto) {
    const slug = dto.slug || generateSlug(dto.name);
    const exists = await this.categoryRepo.findOne({ where: { slug } });
    if (exists) {
      throw new BadRequestException('Danh mục đã tồn tại với slug này');
    }
    const cat = this.categoryRepo.create({ ...dto, slug });
    return this.categoryRepo.save(cat);
  }

  async updateCategory(id: string, dto: UpdateListingCategoryDto) {
    const cat = await this.categoryRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Không tìm thấy danh mục');
    if (dto.name && !dto.slug) {
      dto.slug = generateSlug(dto.name);
    }
    Object.assign(cat, dto);
    return this.categoryRepo.save(cat);
  }

  async deleteCategory(id: string) {
    const cat = await this.categoryRepo.findOne({ where: { id } });
    if (!cat) throw new NotFoundException('Không tìm thấy danh mục');
    await this.categoryRepo.remove(cat);
    return { success: true };
  }

  // ----------------------------------------------------
  // LISTINGS PUBLIC & USER READ
  // ----------------------------------------------------
  async findAll(query: QueryListingDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 12;
    const skip = (page - 1) * limit;

    const qb = this.listingRepo
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.user', 'user')
      .leftJoinAndSelect('listing.category', 'category');

    // Filter by status (default to ACTIVE unless explicitly requested)
    if (query.status) {
      qb.andWhere('listing.status = :status', { status: query.status });
    } else {
      qb.andWhere('listing.status IN (:...statuses)', {
        statuses: [ListingStatus.ACTIVE, ListingStatus.SOLD],
      });
    }

    if (query.search) {
      qb.andWhere(
        '(LOWER(listing.title) LIKE LOWER(:search) OR LOWER(listing.description) LIKE LOWER(:search) OR LOWER(listing.province) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    if (query.categoryId) {
      qb.andWhere('listing.categoryId = :catId', { catId: query.categoryId });
    }

    if (query.categorySlug) {
      qb.andWhere('category.slug = :catSlug', { catSlug: query.categorySlug });
    }

    if (query.province) {
      qb.andWhere('listing.province = :province', { province: query.province });
    }

    if (query.condition) {
      qb.andWhere('listing.condition = :condition', { condition: query.condition });
    }

    if (query.minPrice !== undefined && query.minPrice !== null) {
      qb.andWhere('listing.price >= :minPrice', { minPrice: Number(query.minPrice) });
    }

    if (query.maxPrice !== undefined && query.maxPrice !== null) {
      qb.andWhere('listing.price <= :maxPrice', { maxPrice: Number(query.maxPrice) });
    }

    const sortBy = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder || 'DESC';
    qb.orderBy(`listing.${sortBy}`, sortOrder);

    const [items, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findBySlug(slug: string, userId?: string) {
    const listing = await this.listingRepo.findOne({
      where: { slug },
      relations: { user: true, category: true, comments: { user: true } },
    });
    if (!listing) throw new NotFoundException('Không tìm thấy tin đăng');

    // Increment view count
    listing.views += 1;
    await this.listingRepo.save(listing);

    let isLiked = false;
    if (userId) {
      const like = await this.likeRepo.findOne({
        where: { listingId: listing.id, userId },
      });
      isLiked = !!like;
    }

    return { ...listing, isLiked };
  }

  async findMyListings(userId: string, page = 1, limit = 12) {
    const skip = (page - 1) * limit;
    const [items, total] = await this.listingRepo.findAndCount({
      where: { userId },
      relations: { category: true },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // ----------------------------------------------------
  // LISTING MUTATIONS (USER)
  // ----------------------------------------------------
  async createListing(userId: string, dto: CreateListingDto) {
    const baseSlug = generateSlug(dto.title);
    const uniqueSuffix = Date.now().toString(36);
    const slug = `${baseSlug}-${uniqueSuffix}`;

    const listing = this.listingRepo.create({
      ...dto,
      userId,
      slug,
      status: ListingStatus.ACTIVE,
    });

    return this.listingRepo.save(listing);
  }

  async updateListing(id: string, userId: string, dto: UpdateListingDto, isAdmin = false) {
    const listing = await this.listingRepo.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Không tìm thấy tin đăng');

    if (!isAdmin && listing.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền sửa tin này');
    }

    if (dto.title && dto.title !== listing.title) {
      const baseSlug = generateSlug(dto.title);
      listing.slug = `${baseSlug}-${Date.now().toString(36)}`;
    }

    Object.assign(listing, dto);
    return this.listingRepo.save(listing);
  }

  async toggleStatus(id: string, userId: string, isAdmin = false) {
    const listing = await this.listingRepo.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Không tìm thấy tin đăng');

    if (!isAdmin && listing.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền đổi trạng thái tin này');
    }

    // Toggle ACTIVE <-> SOLD
    listing.status = listing.status === ListingStatus.ACTIVE ? ListingStatus.SOLD : ListingStatus.ACTIVE;
    return this.listingRepo.save(listing);
  }

  async deleteListing(id: string, userId: string, isAdmin = false) {
    const listing = await this.listingRepo.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Không tìm thấy tin đăng');

    if (!isAdmin && listing.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền xoá tin này');
    }

    await this.listingRepo.remove(listing);
    return { success: true };
  }

  // ----------------------------------------------------
  // INTERACTIONS (LIKE, COMMENT, REPORT)
  // ----------------------------------------------------
  async toggleLike(listingId: string, userId: string) {
    const listing = await this.listingRepo.findOne({ where: { id: listingId } });
    if (!listing) throw new NotFoundException('Tin đăng không tồn tại');

    const existing = await this.likeRepo.findOne({
      where: { listingId, userId },
    });

    if (existing) {
      await this.likeRepo.remove(existing);
      listing.likesCount = Math.max(0, listing.likesCount - 1);
      await this.listingRepo.save(listing);
      return { liked: false, likesCount: listing.likesCount };
    } else {
      const like = this.likeRepo.create({ listingId, userId });
      await this.likeRepo.save(like);
      listing.likesCount += 1;
      await this.listingRepo.save(listing);
      return { liked: true, likesCount: listing.likesCount };
    }
  }

  async addComment(listingId: string, userId: string, dto: CreateListingCommentDto) {
    const listing = await this.listingRepo.findOne({ where: { id: listingId } });
    if (!listing) throw new NotFoundException('Tin đăng không tồn tại');

    const comment = this.commentRepo.create({
      content: dto.content,
      parentId: dto.parentId,
      listingId,
      userId,
    });
    const saved = await this.commentRepo.save(comment);

    listing.commentsCount += 1;
    await this.listingRepo.save(listing);

    return this.commentRepo.findOne({
      where: { id: saved.id },
      relations: { user: true },
    });
  }

  async createReport(listingId: string, userId: string, dto: CreateListingReportDto) {
    const listing = await this.listingRepo.findOne({ where: { id: listingId } });
    if (!listing) throw new NotFoundException('Tin đăng không tồn tại');

    const report = this.reportRepo.create({
      reason: dto.reason,
      listingId,
      userId,
    });
    return this.reportRepo.save(report);
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------
  async adminFindAll(query: QueryListingDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 15;
    const skip = (page - 1) * limit;

    const qb = this.listingRepo
      .createQueryBuilder('listing')
      .leftJoinAndSelect('listing.user', 'user')
      .leftJoinAndSelect('listing.category', 'category');

    if (query.status) {
      qb.andWhere('listing.status = :status', { status: query.status });
    }

    if (query.search) {
      qb.andWhere(
        '(LOWER(listing.title) LIKE LOWER(:search) OR LOWER(user.name) LIKE LOWER(:search))',
        { search: `%${query.search}%` },
      );
    }

    qb.orderBy('listing.createdAt', 'DESC');

    const [items, total] = await qb.skip(skip).take(limit).getManyAndCount();

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async adminTogglePin(id: string) {
    const listing = await this.listingRepo.findOne({ where: { id } });
    if (!listing) throw new NotFoundException('Không tìm thấy tin đăng');

    listing.isPinned = !listing.isPinned;
    return this.listingRepo.save(listing);
  }
}
