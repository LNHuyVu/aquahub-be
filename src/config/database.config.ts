import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../modules/users/entities/user.entity';
import { Fish, FishCategory } from '../modules/fish/entities/fish.entity';
import { Post, Comment, Like, Bookmark, Report } from '../modules/posts/entities/post.entity';
import { Question, Answer } from '../modules/questions/entities/question.entity';
import { Tank, TankFish, TankLog } from '../modules/tanks/entities/tank.entity';
import { Article } from '../modules/articles/entities/article.entity';
import { ArticleCategory } from '../modules/articles/entities/article-category.entity';
import { Ad } from '../modules/ads/entities/ad.entity';
import { Setting } from '../modules/settings/entities/setting.entity';
import {
  Listing,
  ListingCategory,
  ListingComment,
  ListingLike,
  ListingReport,
} from '../modules/listings/entities/listing.entity';

import { TrafficLog } from '../modules/traffic/entities/traffic-log.entity';

export const getDatabaseConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME', 'postgres'),
  password: configService.get<string>('DB_PASSWORD', 'postgre369'),
  database: configService.get<string>('DB_DATABASE', 'aquahub'),
  entities: [
    User,
    Fish,
    FishCategory,
    Post,
    Comment,
    Like,
    Bookmark,
    Report,
    Question,
    Answer,
    Tank,
    TankFish,
    TankLog,
    Article,
    ArticleCategory,
    Ad,
    Setting,
    Listing,
    ListingCategory,
    ListingComment,
    ListingLike,
    ListingReport,
    TrafficLog,
  ],
  synchronize: true, // auto sync tables in development
  logging: false,
});
