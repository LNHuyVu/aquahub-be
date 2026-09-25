import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ListingsService } from './listings.service';
import {
  CreateListingDto,
  UpdateListingDto,
  QueryListingDto,
  CreateListingCategoryDto,
  UpdateListingCategoryDto,
  CreateListingCommentDto,
  CreateListingReportDto,
} from './dto/listings.dto';
import { Public, Roles } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Role } from '../../common/enums/role.enum';

@Controller('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  // ----------------------------------------------------
  // CATEGORIES (PUBLIC READ, ADMIN WRITE)
  // ----------------------------------------------------
  @Public()
  @Get('categories')
  getCategories() {
    return this.listingsService.findAllCategories();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('categories')
  createCategory(@Body() dto: CreateListingCategoryDto) {
    return this.listingsService.createCategory(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put('categories/:id')
  updateCategory(@Param('id') id: string, @Body() dto: UpdateListingCategoryDto) {
    return this.listingsService.updateCategory(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('categories/:id')
  deleteCategory(@Param('id') id: string) {
    return this.listingsService.deleteCategory(id);
  }

  // ----------------------------------------------------
  // LISTINGS PUBLIC & USER READ
  // ----------------------------------------------------
  @Public()
  @Get()
  getListings(@Query() query: QueryListingDto) {
    return this.listingsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-listings')
  getMyListings(
    @CurrentUser('id') userId: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.listingsService.findMyListings(userId, page, limit);
  }

  @Public()
  @Get(':slug')
  getListingBySlug(
    @Param('slug') slug: string,
    @CurrentUser('id') userId?: string,
  ) {
    return this.listingsService.findBySlug(slug, userId);
  }

  // ----------------------------------------------------
  // LISTINGS MUTATIONS (AUTHENTICATED)
  // ----------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Post()
  createListing(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateListingDto,
  ) {
    return this.listingsService.createListing(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateListing(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
    @Body() dto: UpdateListingDto,
  ) {
    return this.listingsService.updateListing(id, userId, dto, role === Role.ADMIN);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggle-status')
  toggleStatus(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.listingsService.toggleStatus(id, userId, role === Role.ADMIN);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteListing(
    @Param('id') id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: string,
  ) {
    return this.listingsService.deleteListing(id, userId, role === Role.ADMIN);
  }

  // ----------------------------------------------------
  // INTERACTIONS (LIKE, COMMENT, REPORT)
  // ----------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  toggleLike(
    @Param('id') listingId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.listingsService.toggleLike(listingId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/comments')
  addComment(
    @Param('id') listingId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateListingCommentDto,
  ) {
    return this.listingsService.addComment(listingId, userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/reports')
  createReport(
    @Param('id') listingId: string,
    @CurrentUser('id') userId: string,
    @Body() dto: CreateListingReportDto,
  ) {
    return this.listingsService.createReport(listingId, userId, dto);
  }

  // ----------------------------------------------------
  // ADMIN CONTROL
  // ----------------------------------------------------
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('admin/all')
  adminGetListings(@Query() query: QueryListingDto) {
    return this.listingsService.adminFindAll(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('admin/create')
  adminCreateListing(@CurrentUser('id') userId: string, @Body() dto: CreateListingDto) {
    return this.listingsService.createListing(userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('admin/:id')
  adminUpdateListing(@Param('id') id: string, @Body() dto: UpdateListingDto) {
    return this.listingsService.updateListing(id, '', dto, true);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Put(':id/toggle-pin')
  adminTogglePin(@Param('id') id: string) {
    return this.listingsService.adminTogglePin(id);
  }
}

